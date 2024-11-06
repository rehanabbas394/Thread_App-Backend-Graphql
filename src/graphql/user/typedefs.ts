import { Mutation } from "./mutation";
import { query } from "./query";

export const typeDefs = `
  type User {
  id: ID!
  firstName: String!
  lastName: String!
  profileImage: String
  email: String!
 }
  type Query {
   ${query}
   getContext:String
  }
  type Mutation {
    ${Mutation}
  }
`;
