import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "@/graphql/schema/schema";
import { VisitorResolvers } from "@/graphql/resolvers/visitor.resolvers";
import { CategoryResolvers } from "@/graphql/resolvers/category.resolvers";
import { AvatarResolvers } from "@/graphql/resolvers/avatar.resolvers";
import { QuestionResolvers } from "@/graphql/resolvers/question.resolvers";
import { QuizUserResolvers } from "@/graphql/resolvers/quiz-users.resolvers";
import { NextRequest } from "next/server";

const resolvers = {
  Query: {
    ...CategoryResolvers.Query,
    ...AvatarResolvers.Query,
    ...QuestionResolvers.Query,
    ...QuizUserResolvers.Query,
  },
  Mutation: {
    ...VisitorResolvers.Mutation,
    ...CategoryResolvers.Mutation,
    ...AvatarResolvers.Mutation,
    ...QuestionResolvers.Mutation,
    ...QuizUserResolvers.Mutation,
  },
};

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
