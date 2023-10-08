const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_ID,
//   process.env.GOOGLE_SECRET,
//   "http://localhost:3000/callback"
// );

// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: ["https://mail.google.com/"],
// });

// console.log("Authorize this app by visiting this URL:", authUrl);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH,
    scope: "https://mail.google.com/",
  },
});

const sendMail = async (userEmail, verificationToken) => {
  const emailOptions = {
    from: "vincentslominski@proton.me",
    to: userEmail,
    subject: "E-mail verification",
    html: `
      <div style="text-align: center;">
        <h1>Codeholics Wallet App</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="https://magazine-app-backend.vercel.app/users/verify/${verificationToken}">
          Verify Email
        </a>
      </div>
    `,
  };
  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log(`Verification Email to ${userEmail} sent: `, info.response);
    }
  });
};
module.exports = sendMail;
