import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    logVisitor(ip: String!, consent: String!, user_agent: String!): Boolean
  }

  type Query {
    _empty: String
  }
`;
