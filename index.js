const express = require("express");
const app = express();
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();
app.use(express.json());
app.post("/sendmail", (req, res) => {
  const { to, subject, message } = req.body;
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_USER_PASSWORD,
      },
    })
  );

  var mailOptions = {
    from: process.env.SMTP_USER_EMAIL,
    to: to, //'friendsgmailacc@gmail.com',
    subject: subject, //'Sending Email using Node.js[nodemailer]',
    text: message, //'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ message: "someting went wrong" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "message send" });
    }
  });
});

app.listen(3000, () => {
  console.log(`app is listening on 3000`);
});
