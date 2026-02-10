import expres from "express";
import {
  signInControlller,
  signUpController,
} from "../controllers/auth.controller";

const router = expres.Router();

router.post("/signin", signInControlller);
router.post("/signup", signUpController);
router.delete("/signout", signInControlller);

export default router;
