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
const crypto_1 = require("crypto");
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// jwt secret
const secret = "RehanAbbas@1234";
class UserService {
    static hashedpassword(password, salt) {
        const hashpassword = (0, crypto_1.createHmac)('sha256', salt).update(password).digest('hex');
        return hashpassword;
    }
    static generatetoken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, secret);
        return token;
    }
    static getUserbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.Prismaclient.user.findUnique({ where: { id } });
        });
    }
    static createUser(payload) {
        const { firstName, lastName, email, password, } = payload;
        const salt = (0, crypto_1.randomBytes)(32).toString('hex');
        const hashpassword = UserService.hashedpassword(password, salt);
        return db_1.Prismaclient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashpassword,
                salt,
            }
        });
    }
    static findUserbyemail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.Prismaclient.user.findUnique({ where: { email } });
        });
    }
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.findUserbyemail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const salt = user.salt;
            const hashpassword = UserService.hashedpassword(password, salt);
            if (hashpassword != user.password) {
                throw new Error('Invalid password');
            }
            const token = UserService.generatetoken({ id: user.id, email: user.email });
            console.log(token);
            return token;
        });
    }
    static decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, secret);
        });
    }
}
exports.default = UserService;
