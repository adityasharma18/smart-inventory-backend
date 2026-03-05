import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 1. Route and Middleware Imports
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js"; 
import { verifyToken } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

// 2. Standard Middleware
// Updated CORS configuration based on your instructions
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://smart-inventory-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 4. Protected Route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

// 5. Basic Health Check
app.get("/", (req, res) => {
  res.json({ message: "Smart Inventory API is running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});