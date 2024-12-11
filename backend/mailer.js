const nodemailer = require("nodemailer");
const { email_user, email_pass } = require("./config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email_user,
    pass: email_pass,
  },

});

const sendEmail = async (to, subject, html, cc) => {
  const mailOptions = {
    from: email_user,
    to: to,
    subject: subject,
    html: html,
    cc: cc ? cc.join(",") : "",
  };

  await transporter.sendMail(mailOptions);
  return true;
};

module.exports = { sendEmail };
