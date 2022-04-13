import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input CategoryInput {
    name: String!
    description: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    questions: [Question]
  }

  type Query {
    getAllCategories: [Category]!
    getCategoryById(id: ID!): Category
  }


  type Mutation {
    createCategory(input: CategoryInput): Category
    updateCategory(id: ID!, input: CategoryInput): Category
    deleteCategory(id: ID!): Category
  }

`;
