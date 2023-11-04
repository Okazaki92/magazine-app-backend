const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

// const SCOPES = ["https://www.googleapis.com/auth/gmail.send"]; // Dodaj wymagane zakresy uprawnień

// const CLIENT_ID = process.env.GOOGLE_ID;
// const CLIENT_SECRET = process.env.GOOGLE_SECRET;
// const REDIRECT_URI = "http://localhost:3000/auth/callback"; // W przypadku aplikacji internetowych

// const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// // Generowanie URL autoryzacji

// // const authorizeUrl = oAuth2Client.generateAuthUrl({
// //   access_type: "offline",
// //   scope: SCOPES,
// // });

// // console.log("Otwórz poniższy URL w przeglądarce:");
// // console.log(authorizeUrl);

// // Po uzyskaniu kodu autoryzacyjnego z przeglądarki:
// const code =
//   "4/0AfJohXm8dpeBiYW6qAsYIOOOUA2L047C9-3Nu24mWLHjpo563k032sS0AqaMwYxrLm_KQQ";

// // async function getToken() {
// //   const { tokens } = await oAuth2Client.getToken(code);
// //   oAuth2Client.setCredentials(tokens);
// //   console.log("Refresh token:", tokens.refresh_token);
// // }

// // getToken();

// oAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH,
// });

// const accessToken = oAuth2Client.getAccessToken();

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.GOOGLE_USER,
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH,
//     accessToken: accessToken,
//   },
// });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

const verificationEmail = async (userEmail, verificationToken) => {
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
  transport.sendMail(emailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending email:", error);
    } else {
      return console.log(
        `Verification Email to ${userEmail} sent: `,
        info.response
      );
    }
  });
};
module.exports = verificationEmail;
