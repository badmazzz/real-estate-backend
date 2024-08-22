import { v4 as uuidv4 } from "uuid";
import {
  createUser as createUserInDB,
  getUserById as getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB,
  getAllUsers as getAllUsersFromDB,
} from "../repository/user.repository";
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

  return await createUserInDB(user);
};

export const updateUser = async (
  userId: string,
  name: string,
  email: string
): Promise<User | null> => {
  const user = await getUserByIdFromDB(userId);
  if (!user) {
    return null;
  }

  const updatedUser: User = {
    ...user,
    name,
    email,
  };

  await updateUserInDB(userId, updatedUser);
  return updatedUser;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const user = await getUserByIdFromDB(userId);
  if (!user) {
    return false;
  }

  await deleteUserFromDB(userId);
  return true;
};

export const findUserById = async (userId: string): Promise<User | null> => {
  return await getUserByIdFromDB(userId);
};

export const listUsers = async (): Promise<User[]> => {
  return await getAllUsersFromDB();
};
