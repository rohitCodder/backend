import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("Email Already Exist", 404));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));
    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new ErrorHandler("password dosent match", 404));
    sendCookie(user, res, "LoggedIn successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  return res
    .status(404)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logged Out Successfully",
    });
};
