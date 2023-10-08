const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER, // Twoje konto Gmail
    pass: process.env.GOOGLE_PASSWORD, // Twoje hasło do konta Gmail
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
        <a href="https://magazine-app.vercel.app/users/verify/${verificationToken}">
          Verify Email
        </a>
      </div>
    `,
  };
  try {
    // Send the email
    const info = await transport.sendMail(emailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
module.exports = verificationEmail;
