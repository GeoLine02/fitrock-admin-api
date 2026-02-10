import express from "express";
import {
  createProductController,
  getProductsController,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProductsController);
router.post("/", createProductController);

export default router;
