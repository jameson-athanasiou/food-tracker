import { ApolloServer } from '@apollo/server'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'
import typeDefs from './schema'
import resolvers from './resolvers'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
