import express from "express";
// import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getProductbyId,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductbyId);

export default router;
