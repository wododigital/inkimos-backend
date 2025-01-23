const nodemailer = require("nodemailer");
const { email_user, email_pass, email_user_2, email_pass_2 } = require("./config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email_user,
    pass: email_pass,
  },

});

const transporter_2 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email_user_2,
    pass: email_pass_2,
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

const sendEmail_2 = async (to, subject, html, cc) => {
  const mailOptions = {
    from: email_user_2,
    to: to,
    subject: subject,
    html: html,
    cc: cc ? cc.join(",") : "",
  };
  await transporter_2.sendMail(mailOptions);
  return true;
};

module.exports = { sendEmail, sendEmail_2 };
