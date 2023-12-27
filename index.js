const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { fetchUserName } = require("./controller");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("home");
});

app.get("/user/:username", fetchUserName);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
