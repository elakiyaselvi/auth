require("dotenv").config();
const express = require("express");
var path = require("path");
const cors = require("cors");

var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Controller Import
const routes = require("./routes/routes");
const router = express.Router();

router.use(function (req, res, next) {
  console.log("Connection to the API..");
  next();
});
require("./routes/routes")(app);
app.use("/api/v1", router);
/*app.post("/api/v1", (req, res) => {
  console.log(req.body);
  return res.send(`Name`);
});*/

const environment = process.env.NODE_ENV;

const stage = require("./config/config");
const port = stage["environment"].port;

app.listen(`${port}`, () => {
  console.log(`Server now listening at localhost:${port}`);
});

module.exports = app;
