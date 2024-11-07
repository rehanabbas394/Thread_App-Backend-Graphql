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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_service_1 = __importDefault(require("../../serviece/user.service"));
exports.resolvers = {
    Query: {
        hello: () => 'Hi, how are you?',
        say: (_, { name }) => `Hello ${name}, how can I help you?`,
        getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield user_service_1.default.loginUser(payload);
            return token;
        }),
        getUserLoggedin: (_, parameter, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Context in getContext:", context);
            if (context && context.user) {
                const id = context.user.id;
                const user = yield user_service_1.default.getUserbyid(id);
                return user;
            }
            throw new Error("User is not authenticated");
        }),
    },
    Mutation: {
        createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_service_1.default.createUser(payload);
            return user.id;
        })
    }
};
