import express from "express";
// Updated imports to include all controller functions
import { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  getLowStockProducts 
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Base routes for creating and fetching products
router.post("/", verifyToken, addProduct);
router.get("/", verifyToken, getProducts);

// New routes from Step 8
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/low-stock", verifyToken, getLowStockProducts);

export default router;