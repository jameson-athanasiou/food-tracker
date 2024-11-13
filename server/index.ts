import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  input AddFoodEntryInput {
    food: String!
    servings: Float!
  }

  input FoodEntriesByDateInput {
    date: String!
  }

  type FoodEntry {
    food: String
    servings: Float
  }

  type AddFoodEntryResponse {
    entry: FoodEntry
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry]
  }

  type Mutation {
    addFoodEntry(input: AddFoodEntryInput): AddFoodEntryResponse
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const foodEntries = [
  {
    date: '11/12/2024',
    food: 'pizza',
    servings: 2,
  },
]

const resolvers = {
  Query: {
    books: () => books,
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return foodEntries.filter(({ date }) => date === input.date)
    },
  },
  Mutation: {
    addFoodEntry: (_, { input }) => {
      console.log(input)
      return { entry: input }
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
