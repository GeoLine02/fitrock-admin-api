import { Products } from "../models/products";

interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  weight: number;
  quantity: number;
  discount?: number;
}

export async function createProductService(data: CreateProductData) {
  try {
    const { name, price, description, weight, quantity, discount } = data;

    const createdProduct = await Products.create({
      product_name: name,
      product_price: price,
      product_description: description,
      product_weight: weight,
      product_quantity: quantity,
      product_discount: discount,
    });

    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
