const nodemailer = require("nodemailer");
require("dotenv").config();

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        accessToken,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

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
