import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    logVisitor(ip: String!, consent: String!, user_agent: String!): Boolean
    createCategories(names: [String!]!): [Category!]!
    createAvatars(urls: [String!]!): [Avatar!]!
    createQuestions(questions: [QuestionInput!]!): [Question!]!
    createQuizUser(input: QuizUserInput!): QuizUser!
    updateQuizUser(id: String!, input: QuizUserInput!): QuizUser
  }

  type Query {
    getAllCategories: [Category!]!
    getAllAvatars: [Avatar!]!
    getAllQuestions: [Question!]!
    getQuestionsByCategory(categoryId: String!): [Question!]!
    getLeaderboard: [QuizUser!]!
    getQuizUserById(id: String!): QuizUser
  }

  type Category {
    id: String
    name: String
  }

  type Avatar {
    id: String
    url: String
  }

  type Question {
    id: String
    question: String!
    option1: String!
    option2: String!
    option3: String!
    option4: String!
    correct_index: Int!
    difficulty: String!
    category_id: String
  }

  input QuestionInput {
    question: String!
    option1: String!
    option2: String!
    option3: String!
    option4: String!
    correct_index: Int!
    difficulty: String!
    category_id: String!
  }

  type QuizUser {
    id: String
    name: String!
    avatar_id: String
    category_id: String
    questions_attempted: Int
    correct: Int
    wrong: Int
    time_finished: Int
    finished_at: String
  }

  input QuizUserInput {
    name: String!
    avatar_id: String
    category_id: String
    questions_attempted: Int
    correct: Int
    wrong: Int
    time_finished: Int
  }
`;
