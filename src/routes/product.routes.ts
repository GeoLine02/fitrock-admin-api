import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
  getProductsCountController,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProductsController);
router.get("/count", getProductsCountController);
router.get("/:id", getProductByIdController);
router.post("/", createProductController);
router.patch("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
