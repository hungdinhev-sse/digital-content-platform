import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!endpoint) {
  throw new Error("HYGRAPH_ENDPOINT is not set in .env.local");
}

export const hygraph = new GraphQLClient(endpoint);