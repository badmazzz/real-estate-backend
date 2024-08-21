import { APIGatewayProxyHandler } from "aws-lambda";
import { findUserById } from "../services/user.services";

export const handler: APIGatewayProxyHandler = async (event) => {
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
