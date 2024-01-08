const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const db = require("../Server/mockdata/db.json");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
//class dashboard
app.get("/class", (req, res) => {
  res.json(db["Class"]);
});
app.get("/class/recently-open", (req, res) => {
  res.json(db["RecentlyOpen"]);
});
app.get("/class/:id", (req, res) => {
  let id = req.params.id;
  const matchingClass = db["Class"].filter((classs) => classs.id == id);
  if (matchingClass.length > 0) {
    res.json(matchingClass);
    console.log(matchingClass);
  } else {
    res.status(404).json({ message: "No class found with the specified id" });
  }
});

app.post("/create-class", (req, res) => {
  try {
    const newClass = req.body;
    db["Class"].push(newClass);
    fs.writeFileSync(
      __dirname + "/../Server/mockdata/db.json",
      JSON.stringify(db)
    );

    res.json({
      message: "Class created successfully",
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
app.post("/add-recent-class", (req, res) => {
  try {
    const recentClass = req.body;
    db["RecentlyOpen"].push(recentClass);
    fs.writeFileSync(
      __dirname + "/../Server/mockdata/db.json",
      JSON.stringify(db)
    );

    res.json({
      message: "Class added successfully",
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/:email", (req, res) => {
  let email = req.params.email;
  console.log(`Searching for users with email ${email}`);

  const matchingUsers = db["User"].filter((user) => user.email === email);

  if (matchingUsers.length > 0) {
    res.json(matchingUsers);
  } else {
    res
      .status(404)
      .json({ message: "No users found with the specified email" });
  }
});
app.get("/getStudents", (req, res) => {
  try {
    const students = db["Students"];
    res.json(students);
    console.log("Backend Response:", students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.get('/:email', (req, res) => {
//   let email = req.params.email;
//   console.log(`Searching for users with email ${email}`);

//   const matchingUsers = db['User'].filter(user => user.email === email);

//   if (matchingUsers.length > 0) {
//     res.json(matchingUsers);
//   } else {
//     res.status(404).json({ message: 'No users found with the specified email' });
//   }
// });

app.post("/login", (req, res) => {
  const loginUser = req.body;
  console.log(loginUser);
  // Check credentials against database and return a token on success
  console.log("Logging in " + loginUser.email);
  const usernameExists = db["User"].some(
    (user) => user.email == loginUser.email
  );
  if (!usernameExists) {
    res.status(401).send("Username does not exist");
  } else {
    if (
      loginUser.password ==
      db["User"].find((u) => u.email == loginUser.email).password
    ) {
      // const jwtToken = createJWT(loginUser.username);
      res.json({ token: "loginSuccess" });
    } else {
      res.status(403).send("Wrong password");
    }
  }
});

app.post("/user", (req, res) => {
  try {
    const newUser = req.body;
    db["User"].push(newUser);

    fs.writeFileSync(
      __dirname + "/../Server/mockdata/db.json",
      JSON.stringify(db)
    );

    db["User"].push(newUser);
    fs.writeFileSync(
      __dirname + "/../Server/mockdata/db.json",
      JSON.stringify(db)
    );
    res.json({
      token: "loginSuccess",
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
app.get("/student/:id", (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = db["Students"].find((s) => s.id === studentId);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addStudents", (req, res) => {
  try {
    const newStudent = req.body;
    newStudent.id = db["Students"].length + 1;
    db["Students"].push(newStudent);

    fs.writeFileSync(
      __dirname + "/../Server/mockdata/db.json",
      JSON.stringify(db)
    );

    res.json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/editStudents/:id", (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const updatedStudent = req.body;

    const index = db["Students"].findIndex((s) => s.id === studentId);

    if (index !== -1) {
      db["Students"][index] = { ...db["Students"][index], ...updatedStudent };

      fs.writeFileSync(
        __dirname + "/../Server/mockdata/db.json",
        JSON.stringify(db)
      );
      res.json(db["Students"][index]);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/deleteStudents/:id", (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const index = db["Students"].findIndex((s) => s.id === studentId);

    if (index !== -1) {
      const deletedStudent = db["Students"].splice(index, 1)[0];

      fs.writeFileSync(
        __dirname + "/../Server/mockdata/db.json",
        JSON.stringify(db)
      );

      res.json(deletedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addScore/:studentId", (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const newStudentScore = req.body;

    // Find the student in the Students database by ID
    const studentIndex = db["Students"].findIndex(
      (student) => student.id === studentId
    );

    if (studentIndex !== -1) {
      // Check if the student already has a score in the studentScore database
      const scoreIndex = db["studentScore"].findIndex(
        (score) => score.studentId === studentId
      );

      if (scoreIndex !== -1) {
        // If the student already has a score, update it
        db["studentScore"][scoreIndex].scores = {
          ...db["studentScore"][scoreIndex].scores,
          ...newStudentScore.scores,
        };
      } else {
        // If the student doesn't have a score, create one
        const newScore = {
          studentId: studentId,
          scores: newStudentScore.scores,
        };
        db["studentScore"].push(newScore);
      }

      fs.writeFileSync(
        __dirname + "/../Server/mockdata/db.json",
        JSON.stringify(db)
      );
      res.json(newStudentScore);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error adding student score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/getStudentScores/:studentId', (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const scoreIndex = db['studentScore'].findIndex((score) => score.studentId === studentId);

    if (scoreIndex !== -1) {
      const studentScores = db['studentScore'][scoreIndex].scores;
      res.json(studentScores);
    } else {
      res.status(404).json({ message: 'Student scores not found' });
    }
  } catch (error) {
    console.error('Error getting student scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
