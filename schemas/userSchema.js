const joi = require("joi");

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  salt: joi.string(),
  sessionToken: joi.string(),
  verify: joi.boolean(),
  verificationToken: joi.string(),
});

module.exports = userSchema;
