import express from "express";
import {
  createProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.post("/", createProductController);
router.patch("/:id", updateProductController);

export default router;
