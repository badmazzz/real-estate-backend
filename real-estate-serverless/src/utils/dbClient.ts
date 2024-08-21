import AWS from "aws-sdk";

const options = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: "http://localhost:8000",
    }
  : {};

const client = new AWS.DynamoDB.DocumentClient(options);

export default client;
