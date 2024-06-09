import express from "express"
import passport from "passport"
import axios from "axios"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

//authenticate the user using google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
)

//forward the request to goggle's authentication server
router.get("/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    )
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

//register or login user to DB
router.get("/login/success", async (req, res) => {
  if (req.user) {
    const email = req.user._json.email;
    const name = req.user._json.name;

    let user = await User.findOne({ email });

    if (user) {
      generateToken(res, user._id);
    } else {
      user = new User({
        name,
        email,
        password: Date.now(), // dummy password
        isAdmin: false // default to false for new users
      });
      await user.save();
      generateToken(res, user._id);
    }

    res.status(200).json({
      user: { ...req.user, isAdmin: user.isAdmin },
      message: "Successfully logged in",
      _id: user._id,
    });
  } else {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
});

//login failed
router.get("/login/failed", (req, res) => {
  res.status(401)
  throw new Error("Login Failed")
})

//logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.log(err)
    }
    res.redirect("/")
  })
})

export default router