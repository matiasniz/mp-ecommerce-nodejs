const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-8196777983571350-031822-2c462f0d08deb2f0b12e1b343176a42c-469485398",
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

module.exports = { getPreferences };
