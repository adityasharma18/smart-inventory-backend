import prisma from "../config/prisma.js";

/* ===============================
   Add Product
=================================*/
export const addProduct = async (req, res) => {
  try {

    const { name, sku, price, quantity, category } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price: Number(price),
        quantity: Number(quantity),
        category,
        userId: req.user.userId
      }
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
/* ===============================
   Get Products (User specific)
=================================*/
export const getProducts = async (req, res) => {
  try {

    const products = await prisma.product.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(products);

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
};


/* ===============================
   Update Product
=================================*/
export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, price, quantity, category } = req.body;

    const updated = await prisma.product.updateMany({
      where: {
        id,
        userId: req.user.userId
      },
      data: {
        name,
        price,
        quantity,
        category
      }
    });

    if (updated.count === 0) {
      return res.status(404).json({
        message: "Product not found or not authorized"
      });
    }

    res.json({
      message: "Product updated successfully"
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


/* ===============================
   Delete Product
=================================*/
export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await prisma.product.deleteMany({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (deleted.count === 0) {
      return res.status(404).json({
        message: "Product not found or not authorized"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


/* ===============================
   Low Stock Products
=================================*/
export const getLowStockProducts = async (req, res) => {
  try {

    const lowStock = await prisma.product.findMany({
      where: {
        userId: req.user.userId,
        quantity: {
          lte: 5
        }
      },
      orderBy: {
        quantity: "asc"
      }
    });

    res.json(lowStock);

  } catch (error) {
    console.error("LOW STOCK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};