const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-8196777983571350-031822-2c462f0d08deb2f0b12e1b343176a42c-469485398",
});

const getPreferences = async (req, res) => {
  const data = req.body;

  let preference = {
    items: [
      {
        id: "1234",
        title: "a.nombre",
        currency_id: "ARS",
        picture_url: "a.foto",
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: 1,
        unit_price: 200, // a.precio,
      },
    ],
    payer: {
      name: "Lalo",
      suername: "Landa",
      email: "test_user_63274575@testuser.com",
      phone: {
        area_code: "011",
        number: 22223333,
      },
      address: {
        street_name: "Falsa",
        street_number: 123,
        zip_code: "1111",
      },
    },
    back_urls: {
      success: "https://matiasniz-mp-ecommerce-nodejs.herokuapp.com/mp",
      failure: "https://matiasniz-mp-ecommerce-nodejs.herokuapp.com/mp",
      pending: "https://matiasniz-mp-ecommerce-nodejs.herokuapp.com/mp",
    },
    auto_return: "approved",
    payment_methods: {
      installments: 6,
    },
    payment_methods: {
      excluded_payment_types: [{ id: "atm" }],
      excluded_payment_methods: [{ id: "amex" }],
    },
    notification_url: `https://matiasniz-mp-ecommerce-nodejs.herokuapp.com/notificaciones`,
    external_reference: "ABCD1234",
  };

  mercadopago.preferences
    .create(preference)
    .then(async (response) => {
      console.log(response.body.init_point);
      global.init_point = response.body.init_point;
      res
        .status(200)
        .send({ mp_url_preference: response.body.init_point })
        .end();
    })
    .catch(function (error) {
      console.log({ error });
      res
        .status(404)
        .send({ error: "Error al generar la preferencia de pago." })
        .end();
    });
};

module.exports = { getPreferences };
