import { Request, Response } from "express";
import { createProductService } from "../services/product.service";

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
