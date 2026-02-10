import jwt from "jsonwebtoken";

export function generateAccessToken(payload: Object): string {
  // Token expires in 1 hour
  const secretKey = process.env.JWT_SECRET_KEY;

  const accessToken = jwt.sign(payload, secretKey!, {
    expiresIn: "7d",
  });
  return accessToken;
}
