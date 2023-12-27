const Express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { fetchUserName } = require("./controller");

const app = Express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("home");
});

app.get("/:username", fetchUserName);

app.listen(5000, () => console.log(`server is running on port 5000`));
