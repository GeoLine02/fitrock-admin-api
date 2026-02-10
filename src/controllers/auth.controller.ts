import { Request, Response } from "express";
import { signInService, SignUpService } from "../services/auth.service";
import { generateAccessToken } from "../helpers/jwt";

export async function signInControlller(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await signInService(email, password);

    const accessToken = generateAccessToken({ id: user.id, email: user.email });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
    }); // 7 days

    res.status(203).json({ message: "Sign in successful", user });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.error("Error signing in:", error);
    res.status(500).json({ message: "Failed to sign in" });
  }
}

export async function signUpController(req: Request, res: Response) {
  try {
    const { email, password, fullName, phone } = req.body;

    const newUser = await SignUpService(email, password, fullName, phone);

    res.status(201).json({ message: "Sign up successful", user: newUser });
  } catch (error: any) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    return res.status(500).json({ message: "Failed to sign up" });
  }
}

export async function signOutController(req: Request, res: Response) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Sign out successful" });
}
