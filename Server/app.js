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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
