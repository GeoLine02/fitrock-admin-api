import express from "express";
import {
  getUserController,
  getUsersCountController,
} from "../controllers/user.controller";
import authGuard from "../guards/authGuard";

const router = express.Router();

router.get("/me", authGuard, getUserController);
router.get("/count", authGuard, getUsersCountController);

export default router;
