import { ApolloServer } from '@apollo/server'
import { mergeTypeDefs } from '@graphql-tools/merge'
import dotenv from 'dotenv'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import typeDefs from './schema'
import resolvers from './resolvers'

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || '4000'

if (!isProduction) {
  dotenv.config()
}

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers,
})

const expressServer = express()

const app = async () => {
  await server.start()

  expressServer.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    // @ts-expect-error idk
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    })
  )

  expressServer.use('/', express.static('dist'))

  expressServer.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`))
}

if (!isProduction) {
  app()
}
