import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { NextRequest } from "next/server";

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  fetchAPI: { Request, Response },
});

export async function GET(req: NextRequest) {
  return yoga.handleRequest(req, {});
}

export async function POST(req: NextRequest) {
  return yoga.handleRequest(req, {});
}
