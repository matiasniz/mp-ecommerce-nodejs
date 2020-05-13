const mercadopago = require("mercadopago");
const axios = require("axios");

const access_token =
  "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398";

mercadopago.configure({
  access_token,
});

const getPreferences = async (image, title, price, unit) => {
  let preference = {
    items: [
      {
        id: "1234",
        title: title,
        currency_id: "ARS",
        picture_url: image,
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: Number(unit),
        unit_price: Number(price),
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
      identification: {
        type: "DNI",
        number: "22.333.444",
      },
    },
    back_urls: {
      success: "https://matiasniz.com/success",
      failure: "https://matiasniz.com/failure",
      pending: "https://matiasniz.com/pending",
    },
    auto_return: "approved",
    payment_methods: {
      installments: 6,
    },
    payment_methods: {
      excluded_payment_types: [{ id: "atm" }],
      excluded_payment_methods: [{ id: "amex" }],
    },
    notification_url: `https://matiasniz.com/mp/notificaciones`,
    external_reference: "ABCD1234",
  };

  return mercadopago.preferences
    .create(preference)
    .then(async (response) => {
      return response.body.id;
    })
    .catch(function (error) {
      console.log({ error });
      return "";
    });
};

const getInfoPago = async (id, resource) => {
  let response;

  if (id) {
    response = await axios(
      `https://api.mercadolibre.com/collections/notifications/${id}?access_token=${access_token}`
    );
  } else {
    response = await axios(`${resource}?access_token=${access_token}`);
  }

  return response.data;
};

module.exports = {
  getPreferences,
  getInfoPago,
};
