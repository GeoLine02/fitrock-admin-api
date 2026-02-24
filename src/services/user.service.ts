import { Users } from "../models/users";

export async function getUserService(id: number) {
  try {
    const user = await Users.findByPk(id, {
      attributes: ["id", "full_name", "email", "phone_number"],
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUsersCountService() {
  try {
    const count = await Users.count();
    return count;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
