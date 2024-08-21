import { v4 as uuidv4 } from "uuid";
import { createUser, getUserById } from "../repository/user.repository";
import { User } from "../models/user.models";

export const registerUser = async (
  name: string,
  email: string
): Promise<User> => {
  const user: User = {
    userId: uuidv4(),
    name,
    email,
  };

  return await createUser(user);
};

export const findUserById = async (userId: string): Promise<User | null> => {
  return await getUserById(userId);
};
