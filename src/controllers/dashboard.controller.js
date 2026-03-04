import prisma from "../config/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await prisma.product.count();

    const lowStockItems = await prisma.product.count({
      where: {
        quantity: {
          lte: 5
        }
      }
    });

    const inventory = await prisma.product.findMany({
      select: {
        price: true,
        quantity: true
      }
    });

    const totalInventoryValue = inventory.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    res.json({
      totalProducts,
      lowStockItems,
      totalInventoryValue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};