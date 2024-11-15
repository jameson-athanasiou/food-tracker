/* eslint-disable max-classes-per-file */
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { FoodEntries } from './FoodEntries'

const typeDefs = `#graphql

  input AddOrUpdateFoodEntryInput {
    id: String!
    date: String!
    food: String!
    servings: Float!
    calcium: Float
    protein: Float
  }

  input FoodEntriesByDateInput {
    date: String!
  }

  type FoodEntry {
    id: ID!
    food: String!
    servings: Float!
    calcium: Float
    protein: Float
  }

  type AddOrUpdateFoodEntryResponse {
    entries: [FoodEntry!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    existingFoodItems: [String!]!
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addOrUpdateFoodEntry(input: AddOrUpdateFoodEntryInput!): AddOrUpdateFoodEntryResponse!
  }
`

const CurrentFoodEntries = new FoodEntries()

const resolvers = {
  Query: {
    existingFoodItems: () => {
      return CurrentFoodEntries.getExistingFoodItems()
    },
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return CurrentFoodEntries.getEntries().filter(({ date }) => date === input.date)
    },
  },
  Mutation: {
    addOrUpdateFoodEntry: (_, { input }) => {
      console.log(input)

      CurrentFoodEntries.setEntries(input)
      CurrentFoodEntries.setNutrition(input)

      return { entries: CurrentFoodEntries.getEntries() }
    },
  },
  FoodEntry: {
    calcium: ({ food }) => {
      return CurrentFoodEntries.getNutrition()[food]?.calcium || 0
    },
    protein: ({ food }) => {
      return CurrentFoodEntries.getNutrition()[food]?.protein || 0
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
