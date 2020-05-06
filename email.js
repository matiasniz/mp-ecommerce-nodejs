process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   host: config.emailHost,
//   port: config.emailPort,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: config.emailUser,
//     pass: config.emailPassword
//   }
// });

const EMAIL_USER = "consultaguialocal@gmail.com";
const EMAIL_PASSWORD = "sqdzlfsffcegcbsh";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

module.exports = ({ email, name, html, to, subject }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to,
    subject,
    html,
    replyTo: from,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};
