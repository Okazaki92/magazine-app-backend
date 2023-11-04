const { nanoid } = require("nanoid");
const { authentication, random } = require("../config/authenticationCrypto");
const validation = require("../helpers/validation");
const userSchema = require("../schemas/userSchema");
const {
  getUserByEmail,
  getUserById,
  verifyToken,
  createUser,
} = require("../services/userServices");
const verificationEmail = require("../helpers/emailSender");

const register = async (req, res, next) => {
  try {
    if (validation(req, res, userSchema)) {
      return;
    }
    const { email, password } = req.body;

    const checkEmail = await getUserByEmail(email);
    if (checkEmail) {
      return res.status(409).json("Something went wrong");
    }

    const salt = random();
    const hashPassword = authentication(salt, password);
    const newUser = await createUser({
      email,
      authentication: {
        salt,
        password: hashPassword,
      },
      verificationToken: nanoid(),
      token: null,
    });
    // await verificationEmail(newUser.email, newUser.verificationToken);
    verificationEmail(newUser.email, newUser.verificationToken);
    return res.status(201).json({
      message: "Registration successful",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (validation(req, res, userSchema)) {
      return;
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("No User or Password");
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(409).json("Something went wrong");
    }
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403).json("Wrong hash crypt");
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("MAGAZINE-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json({
      message: "Welcome",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // if (validation(req, res, userSchema)) {
    //   return;
    // }
    const user = req.params;
    const currentUser = await getUserById(user.id).select(
      "+authentication.sessionToken"
    );
    currentUser.authentication.sessionToken = null;
    currentUser.save();
    res.clearCookie("MAGAZINE-AUTH", { domain: "localhost", path: "/" });

    return res.status(200).json("Logout Success");
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (validation(req, res, userSchema)) {
      return;
    }
    const user = req.params;
    const currentUser = await getUserById(user._id);

    return res.status(200).json({
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await verifyToken(verificationToken, {
      verify: true,
      verificationToken: null,
    });
    console.log(user);
    if (!user) {
      return res.status(404).json("User not found");
    }
    // res.redirect();
    return res.status(200).json("Verification successful");
  } catch (error) {
    next(error);
  }
};

const sendVerifyToken = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email).select(
      "+verificationToken +verify"
    );

    if (!user) {
      return res.status(404).json("Not found");
    }
    if (user.verify) {
      return res.status(400).json("Verification has been passed");
    }
    const newVerifyToken = user.verificationToken;
    await verificationEmail(email, newVerifyToken);
    return res.status(200).json({
      message: `A verification link was sent to your registered email`,
      token: newVerifyToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verifyUserToken,
  sendVerifyToken,
  logout,
  getUser,
};
