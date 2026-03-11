import express from "express";
import {
  createFilerController,
  deleteFilterController,
  getFilterByIdController,
  getFiltersController,
  updateFilterController,
} from "../controllers/filters.controller";

const router = express.Router();

router.get("/", getFiltersController);
router.get("/:id", getFilterByIdController);
router.post("/", createFilerController);
router.patch("/:id", updateFilterController);
router.delete("/:id", deleteFilterController);

export default router;
