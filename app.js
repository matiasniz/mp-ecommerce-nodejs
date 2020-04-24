var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var mp = require("./mp");

var port = process.env.PORT || 3000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", function (req, res) {
  res.render("detail", req.query);
});

app.post("/mp/preferences", mp.getPreferences);

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port, () => console.log(`run in http://localhost:${port}`));
