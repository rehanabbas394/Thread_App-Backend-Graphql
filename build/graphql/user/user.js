"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const resolver_1 = require("./resolver");
const typedefs_1 = require("./typedefs");
exports.User = { typeDefs: typedefs_1.typeDefs, query: query_1.query, Mutation: mutation_1.Mutation, resolvers: resolver_1.resolvers };
