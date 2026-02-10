import { Request, Response } from "express";
import {
  createProductService,
  getProductByIdService,
  getProductsService,
} from "../services/product.service";

export async function getProductsController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const products = await getProductsService(page, limit);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const product = await getProductByIdService(id);
    res.status(200).json(product);
  } catch (error: any) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      res.status(404).json({ error: "Product not found" });
    } else {
      console.error("Error in getProductByIdController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function createProductController(req: Request, res: Response) {
  try {
    const data = req.body;
    const createdProduct = await createProductService(data);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error in createProductController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
