"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const mutation_1 = require("./mutation");
const query_1 = require("./query");
exports.typeDefs = `
  type User {
  id: ID!
  firstName: String!
  lastName: String!
  profileImage: String
  email: String!
 }
  type Query {
   ${query_1.query}
   getContext:String
  }
  type Mutation {
    ${mutation_1.Mutation}
  }
`;
