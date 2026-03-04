import prisma from "../config/prisma.js";

// Create a new product
export const addProduct = async (req, res) => {
  try {
    const { name, sku, price, quantity, category } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        quantity,
        category
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products (ordered by newest first)
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, category } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        quantity,
        category
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STEP 7 — Low Stock Alert System
// This returns products where stock is <= 5
export const getLowStockProducts = async (req, res) => {
  try {
    const lowStock = await prisma.product.findMany({
      where: {
        quantity: {
          lte: 5
        }
      }
    });

    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};