import { Op } from "sequelize";
import { Products } from "../models/products";

interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  weight: number;
  quantity: number;
  discount?: number;
}

export async function getProductsService(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const products = await Products.findAll({
      offset,
      limit,
    });

    const productsCount = await Products.count();
    return { products: products, totalRows: productsCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getLowInStockProductsService() {
  try {
    const LOW_STOCK_LIMIT = 5; // change threshold if needed

    const products = await Products.findAll({
      where: {
        product_quantity: {
          [Op.lte]: LOW_STOCK_LIMIT,
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
}

export async function getProductsCountService() {
  try {
    const productsCount = await Products.count();
    return productsCount;
  } catch (error) {
    console.error("Error fetching products count:", error);
    throw error;
  }
}

export async function getProductByIdService(id: number) {
  try {
    const product = await Products.findByPk(id);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
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

export async function updateProductService(
  id: number,
  data: CreateProductData,
) {
  try {
    const { name, price, description, weight, quantity, discount } = data;
    const product = await Products.findByPk(id);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const updatedProduct = await product.update(
      {
        product_description: description,
        product_name: name,
        product_price: price,
        product_discount: discount,
        product_quantity: quantity,
        product_weight: weight,
      },
      {
        where: { id },
      },
    );

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProductService(id: number) {
  try {
    const product = await Products.findByPk(id);

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const deletedProduct = await Products.destroy({
      where: { id },
    });

    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
