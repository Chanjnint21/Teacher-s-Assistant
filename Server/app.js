const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs');

const db = require('../Server/mockdata/db.json');

const app = express()
app.use(cors());
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.get('/:email', (req, res) => {
  let email = req.params.email;
  console.log(`Searching for users with email ${email}`);

  const matchingUsers = db['User'].filter(user => user.email === email);

  if (matchingUsers.length > 0) {
    res.json(matchingUsers);
  } else {
    res.status(404).json({ message: 'No users found with the specified email' });
  }
})

app.post('/login', (req, res) => {
  const loginUser = req.body;
  console.log(loginUser)
  // Check credentials against database and return a token on success
  console.log("Logging in " + loginUser.email);
  const usernameExists = db["User"].some((user) => user.email == loginUser.email);
  if (!usernameExists) {
    res.status(401).send("Username does not exist");
    } else {
      if (loginUser.password == db["User"].find(u => u.email == loginUser.email).password){
        // const jwtToken = createJWT(loginUser.username);
        res.json({token : 'loginSuccess'});
      } else {
      res.status(403).send("Wrong password")
    }
  }
})

app.post('/user', (req, res) => {
  try {
    const newUser = req.body;
    db['User'].push(newUser);

    fs.writeFileSync(__dirname + '/../Server/mockdata/db.json', JSON.stringify(db));

    res.json({
      token : 'loginSuccess'
    });
  } catch (error) {
      console.error('Error processing POST request:', error);
      res.status(500).json({
          'message': 'Internal Server Error'
      });
  }
})

// app.post('/addScore', (req, res) => {
//   try {
//     const studentScore = req.body;
//     db['Students'].push(studentScore)
//     fs.writeFileSync(__dirname + '/../Server/mockdata/db.json', JSON.stringify(db));
//   }catch(error) {
//     console.log('Error to add student score')
//     res.status(500).json({
//       'message' : 'Internal Server Error'
//     })
//   }
// })


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
