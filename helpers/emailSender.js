const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_USER, // Twoje konto Gmail
    pass: process.env.GOOGLE_PASSWORD, // Twoje hasło do konta Gmail
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
  transport.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log(`Verification Email to ${userEmail} sent: `, info.response);
    }
  });
};
module.exports = sendMail;
