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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express4_1 = require("@apollo/server/express4");
const server_1 = __importDefault(require("./graphql/server"));
const user_service_1 = __importDefault(require("./serviece/user.service"));
function gqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Express app
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 3000;
        // Middleware
        app.use(body_parser_1.default.json()); // both work for json returning data
        // app.use(express.json())
        // create GraphQL server
        // Routes
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(`Server is running`);
        }));
        // Apply middleware
        // const server = await CreateServer()
        const server = yield (0, server_1.default)();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers['token'];
                // console.log("Token:", token);
                if (!token) {
                    console.log("No token provided");
                    return { user: null };
                }
                try {
                    const user = yield user_service_1.default.decodeToken(token);
                    return { user };
                }
                catch (e) {
                    console.error("Token decode error:", e);
                    return { user: null };
                }
            }),
        }));
        // Server listen
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
gqlServer();
