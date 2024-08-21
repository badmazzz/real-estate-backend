import { APIGatewayProxyHandler } from "aws-lambda";
import { registerUser } from "../services/user.services";

export const handler: APIGatewayProxyHandler = async (event) => {
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
