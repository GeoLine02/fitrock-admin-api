import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { sequelize } from "./db";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import authGuard from "./guards/authGuard";
import userRoutes from "./routes/user.routes";
import filtersRoutes from "./routes/filters.routes";
import { initAssociations } from "./models/associations";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4001; // Make sure this matches frontend

// =====================
// Middleware
// =====================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// Routes
// =====================
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/products", authGuard, productRoutes);
app.use("/filters", authGuard, filtersRoutes);

// =====================
// 404 Handler (must come after routes)
// =====================
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// =====================
// Error Handler (MUST BE LAST)
// =====================
app.use(errorHandler);

// =====================
// Start Server
// =====================
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established");

    // ✅ INIT ASSOCIATIONS HERE
    initAssociations();
    console.log("✓ Model associations initialized");

    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("✓ Database models synchronized");

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
