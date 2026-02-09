import { Router } from "express";

const router = Router();

// Health check route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// Add your routes below
// Example:
// router.use('/users', userRoutes);

export default router;
