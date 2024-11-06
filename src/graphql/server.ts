import { ApolloServer } from '@apollo/server'
import { resolvers } from './user/resolver';
import { typeDefs } from './user/typedefs'; 

async function CreateServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start()
    return server
}

export default CreateServer;