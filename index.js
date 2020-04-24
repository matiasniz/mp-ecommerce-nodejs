var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var mp = require("./mp");

var port = process.env.PORT || 3000;

var baseurl = "http://localhost";

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", async function (req, res) {
  let image = baseurl + req.query.img;
  let title = req.query.title;
  let price = req.query.price;
  let unit = req.query.unit;
  let id_preference = await mp.getPreferences(image, title, price, unit);
  res.render("detail", { ...req.query, id_preference });
});

// app.post("/mp/preferences", mp.getPreferences);

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port);
