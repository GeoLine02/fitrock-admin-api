import express from "express";
import {
  createProductController,
  getProductByIdController,
  getProductsController,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.post("/", createProductController);

export default router;
