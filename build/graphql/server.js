"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const resolver_1 = require("./user/resolver");
const typedefs_1 = require("./user/typedefs");
function CreateServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: typedefs_1.typeDefs,
            resolvers: resolver_1.resolvers
        });
        yield server.start();
        return server;
    });
}
exports.default = CreateServer;
