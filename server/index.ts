/* eslint-disable max-classes-per-file */
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { unique } from 'radash'
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

  input UpdateFoodNutritionInput {
    food: String!
    calcium: Float
    protein: Float
  }

  type FoodEntry {
    id: ID!
    food: String!
    servings: Float!
    calcium: Float
    protein: Float
  }

  type ExistingFood {
    food: String!
    calcium: Float
    protein: Float
  }

  type AddOrUpdateFoodEntryResponse {
    entries: [FoodEntry!]!
  }

  type Query {
    existingFoodItems: [ExistingFood!]!
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addOrUpdateFoodEntry(input: AddOrUpdateFoodEntryInput!): AddOrUpdateFoodEntryResponse!
    updateFoodNutrition(input: UpdateFoodNutritionInput!): ExistingFood!
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
    updateFoodNutrition: (_, { input }) => {
      CurrentFoodEntries.setNutrition(input)

      return input
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
