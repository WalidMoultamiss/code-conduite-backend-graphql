import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    input QuestionInput {
        title: String!
        description: String!
        category: String!
        answer1: String!
        answer2: String!
        answer3: String!
        answer4: String!
        image: String!
        correctAnswer: Int!
    }

    type Question {
        id: ID!
        title: String!
        description: String!
        image: String!
        category: String!
        answer1: String!
        answer2: String!
        answer3: String!
        answer4: String!
        correctAnswer: Int!
    }

    type Query {
        getAllQuestions: [Question]
        getQuestionById(id: ID!): Question
    }

    type Mutation {
        createQuestion(input: QuestionInput): Question
        updateQuestion(id: ID!, input: QuestionInput): Question
        deleteQuestion(id: ID!): Question
    }
`;