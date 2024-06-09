import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateIsAdmin,
  doctorFormFillup,
} from "../controllers/userController.js";
const router = express.Router();
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserProfile);
router.route("/logout").get(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/update-isAdmin").patch(protect, updateIsAdmin);
router.route("/reset-password/:resetToken").patch(resetPassword);
router.route("/post-doctor-formfillup").post(protect, admin, doctorFormFillup);
export default router;
