import express from 'express'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4';
import CreateServer from './graphql/server';
import UserService from './serviece/user.service';

async function gqlServer() {
    // Express app
    const app = express()
    const PORT = process.env.PORT || 3000

    // Middleware
    app.use(bodyParser.json())  // both work for json returning data
    // app.use(express.json())

    // create GraphQL server

    // Routes
    app.get('/', async (req, res) => {
        res.send(`Server is running`)
    })

    // Apply middleware
    // const server = await CreateServer()
    const server = await CreateServer();
    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }: { req: express.Request }) => {
                const token = req.headers['token'] as string;
                // console.log("Token:", token);

                if (!token) {
                    console.log("No token provided");
                    return { user: null };
                }

                try {
                    const user = await UserService.decodeToken(token);
                    return { user };
                } catch (e) {
                    console.error("Token decode error:", e);
                    return { user: null };
                }
            },
        })
    );


    // Server listen
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

gqlServer()