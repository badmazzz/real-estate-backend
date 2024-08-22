import { APIGatewayProxyHandler } from "aws-lambda";
import {
  registerUser,
  findUserById,
  updateUser,
  deleteUser,
  listUsers,
} from "../services/user.services";

export const createUserHandler: APIGatewayProxyHandler = async (event) => {
  const { name, email } = JSON.parse(event.body!);

  try {
    const newUser = await registerUser(name, email);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created successfully!", newUser }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create user" }),
    };
  }
};

export const getUserHandler: APIGatewayProxyHandler = async (event) => {
  const userId = event.pathParameters!.id!;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not retrieve user" }),
    };
  }
};

export const updateUserHandler: APIGatewayProxyHandler = async (event) => {
  const userId = event.pathParameters!.id!;
  const { name, email } = JSON.parse(event.body!);

  try {
    const updatedUser = await updateUser(userId, name, email);
    if (!updatedUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User updated successfully!",
        updatedUser,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update user" }),
    };
  }
};

export const deleteUserHandler: APIGatewayProxyHandler = async (event) => {
  const userId = event.pathParameters!.id!;

  try {
    const result = await deleteUser(userId);
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete user" }),
    };
  }
};

export const listUsersHandler: APIGatewayProxyHandler = async () => {
  try {
    const users = await listUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not retrieve users" }),
    };
  }
};
