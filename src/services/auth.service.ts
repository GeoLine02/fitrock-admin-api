import { Users } from "../models/users";
import bcrypt from "bcrypt";
export async function signInService(email: string, password: string) {
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in");
  }
}

export async function SignUpService(
  email: string,
  password: string,
  fullName: string,
  phone: string,
) {
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email,
      password: hashedPassword,
      full_name: fullName,
      phone_number: phone,
    });

    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up");
  }
}
