var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var mp = require("./mp");

var port = process.env.PORT || 3000;

var baseurl = "https://matiasniz.com";

const sendMail = require("./email");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", async function (req, res) {
  let image = baseurl + "/" + req.query.img;

  let title = req.query.title;
  let price = req.query.price;
  let unit = req.query.unit;
  let id_preference = await mp.getPreferences(image, title, price, unit);
  res.render("detail", { ...req.query, id_preference });
});

app.get("/mp", async function (req, res) {
  res.redirect(req.query.back_url);
});

app.get("/success", async (req, res) => {
  const pago = await mp.getInfoPago(req.query.collection_id);
  res.render("success", {
    ...req.query,
    ...pago.collection,
  });
});

app.get("/failure", (req, res) => {
  res.render("failure", req.query);
});

app.get("/pending", async (req, res) => {
  const pago = await mp.getInfoPago(req.query.collection_id);
  res.render("pending", {
    ...req.query,
    ...pago.collection,
  });
});

app.post("/mp/notificaciones", async (req, res) => {
  let msg = req.body;
  try {
    if (msg.topic === "payment") {
      let pago = await getInfoPago(msg.id);

      if (notaVenta.mp_status === "in_process") {
        if (pago.collection.status === "approved") {
          console.log("El pago fue aprobado");
          await sendMail({
            email: "niz.matias@gmail.com",
            html: "El pago fue aprobado",
            to: "niz.matias@gmail.com",
            subject: "Notificacion de Mercado Pago",
          });
        }
        if (pago.collection.status === "failure") {
          console.log("El pago fue rechazado");
          await sendMail({
            email: "niz.matias@gmail.com",
            html: "El pago fue rechazado",
            to: "niz.matias@gmail.com",
            subject: "Notificacion de Mercado Pago",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    await sendMail({
      email: "niz.matias@gmail.com",
      html: JSON.stringify(error),
      to: "niz.matias@gmail.com",
      subject: "Notificacion de Mercado Pago",
    });
  }
  req.status(200).send({ msg: "ok" }).end();
});

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port);
