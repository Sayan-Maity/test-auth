import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User doesn't Exists, please register first");
  }

  generateToken(res, user._id); // setting token inside httpCookie

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({ message: "loginUser" });
  console.log("loginUser");
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Credentials");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const resetToken = user.createPasswordResetToken();
  user.save();

  //   const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  //   const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
  const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;

  const message = `Forgot Password? Click on this this link to reset your Password: ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password reset token. (valid for 10mins)",
      message,
    });

    res.status(200).json({
      message: "Token Sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    console.log(error);

    res.status(500).json({
      status: "error",
      message:
        "There was an error in sending the email. Please Try again later",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateIsAdmin = asyncHandler(async (req, res) => {
  const { email, isAdmin } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  user.isAdmin = isAdmin;
  await user.save();

  res.status(200).json({ message: "User updated to admin successfully", user });
});

const doctorFormFillup = asyncHandler(async (req, res) => {
  const { email, gender, age, major, experience } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }
  
  const formSubmission = {
    gender,
    age,
    major,
    experience,
  };
  user.doctorInfo.push({ formSubmission });
  await user.save();
  
  res.status(200).json({ message: "Doctor Form Filled Successfully", user });
})

export {
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateIsAdmin,
  doctorFormFillup,
};