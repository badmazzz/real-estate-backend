import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { User } from "../models/user.models";
import dbClient from "../config/db";

const USERS_TABLE = process.env.USERS_TABLE!;

export const createUser = async (user: User): Promise<User> => {
  const command = new PutCommand({
    TableName: USERS_TABLE,
    Item: user,
  });

  await dbClient.send(command);
  return user;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const command = new GetCommand({
    TableName: USERS_TABLE,
    Key: { userId },
  });

  const result = await dbClient.send(command);
  return result.Item as User | null;
};

export const updateUserInDB = async (
  userId: string,
  updatedUser: User
): Promise<void> => {
  const command = new UpdateCommand({
    TableName: USERS_TABLE,
    Key: { userId },
    UpdateExpression: "set #name = :name, #email = :email",
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":name": updatedUser.name,
      ":email": updatedUser.email,
    },
    ReturnValues: "UPDATED_NEW",
  });

  await dbClient.send(command);
};

export const deleteUserFromDB = async (userId: string): Promise<void> => {
  const command = new DeleteCommand({
    TableName: USERS_TABLE,
    Key: { userId },
  });

  await dbClient.send(command);
};

export const getAllUsers = async (): Promise<User[]> => {
  const command = new ScanCommand({
    TableName: USERS_TABLE,
  });

  const result = await dbClient.send(command);
  return result.Items as User[];
};
