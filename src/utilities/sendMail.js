const nodemailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email Send");
  } catch (error) {
    console.log(error, "Fail");
  }
};

module.exports = sendMail;
