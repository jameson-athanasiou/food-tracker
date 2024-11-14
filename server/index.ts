import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuidV4 } from 'uuid'

const typeDefs = `#graphql

  input AddFoodEntryInput {
    date: String!
    food: String!
    servings: Float!
  }

  input FoodEntriesByDateInput {
    date: String!
  }

  type FoodEntry {
    id: ID!
    food: String!
    servings: Float!
  }

  type AddFoodEntryResponse {
    entries: [FoodEntry!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addFoodEntry(input: AddFoodEntryInput!): AddFoodEntryResponse!
  }
`

const foodEntries = [
  {
    id: '78e3c73c-fabb-47fd-ace4-5f374dc9bdaf',
    date: '11/13/2024',
    food: 'pizza',
    servings: 2,
  },
  {
    id: 'bc89c02b-631e-4899-ab59-a8d9c791b032',
    date: '11/13/2024',
    food: 'crackers',
    servings: 1,
  },
]

const resolvers = {
  Query: {
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return foodEntries.filter(({ date }) => date === input.date)
    },
  },
  Mutation: {
    addFoodEntry: (_, { input }) => {
      const { date, food, servings } = input
      console.log(input)
      foodEntries.push({
        id: uuidV4(),
        date,
        food,
        servings,
      })
      return { entries: foodEntries }
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
