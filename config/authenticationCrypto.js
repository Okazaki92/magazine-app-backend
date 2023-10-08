const crypto = require("crypto");
require("dotenv").config();

const secret = process.env.CRYPT_SECRET;

const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

const random = () => crypto.randomBytes(128).toString("base64");

module.exports = { authentication, random };
