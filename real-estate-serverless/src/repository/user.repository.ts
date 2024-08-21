import dbClient from "../utils/dbClient";
import { User } from "../models/user.models";

const USERS_TABLE = process.env.USERS_TABLE!;

export const createUser = async (user: User): Promise<User> => {
  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };

  await dbClient.put(params).promise();
  return user;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
  };

  const result = await dbClient.get(params).promise();
  return result.Item as User | null;
};
