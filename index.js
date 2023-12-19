const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  registerUser,
  getUserByEmail,
  getUserByUID,
  loginUser,
} = require("./lib/auth");

const PORT = 3000 || process.env.PORT;

// Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    const result = await loginUser(email, password);

    if (!result?.code && !result?.message) res.status(200).send(result.user);
    else res.status(500).send("Failed to login user.");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  const { email, password } = req.body;
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if email and password are provided
    if (!email || !password || !username) {
      return res.status(400).send("Email, password and username are required!");
    }

    await registerUser(email, password, username);

    // get user
    const user = await getUserByEmail(email);

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/user/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) return res.status(400).send("User ID is required!");

    const user = await getUserByUID(uid);

    if (!user) return res.status(404).send("User not found.");

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
