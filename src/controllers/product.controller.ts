import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getLowInStockProductsService,
  getProductByIdService,
  getProductsCountService,
  getProductsService,
  updateProductService,
} from "../services/product.service";

export async function getProductsController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { products, totalRows } = await getProductsService(page, limit);

    res.status(200).json({ products, totalRows });
  } catch (error) {
    console.error("Error in getProductsController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getLowInStockProductsController(
  req: Request,
  res: Response,
) {
  try {
    const lowInStockProducts = await getLowInStockProductsService();
    return res.status(200).json({
      products: lowInStockProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProductsCountController(req: Request, res: Response) {
  try {
    const productsCount = await getProductsCountService();
    res.status(200).json({ count: productsCount });
  } catch (error) {
    console.error("Error in getProductsCountController:", error);
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

export async function updateProductController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updatedProduct = await updateProductService(id, data);
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      res.status(404).json({ error: "Product not found" });
    } else {
      console.error("Error in updateProductController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function deleteProductController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const deletedProduct = await deleteProductService(id);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error: any) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
