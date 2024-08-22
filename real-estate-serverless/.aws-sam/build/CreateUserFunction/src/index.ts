import AWS from "aws-sdk";
import {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  listUsersHandler,
} from "./handlers/user.handlers";

// AWS Lambda handler exports
export const createUser = createUserHandler;
export const getUser = getUserHandler;
export const updateUser = updateUserHandler;
export const deleteUser = deleteUserHandler;
export const listUsers = listUsersHandler;
