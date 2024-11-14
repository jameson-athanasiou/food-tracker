/* eslint-disable max-classes-per-file */
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuidV4 } from 'uuid'

const typeDefs = `#graphql

  input AddOrUpdateFoodEntryInput {
    id: String!
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

  type AddOrUpdateFoodEntryResponse {
    entries: [FoodEntry!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addOrUpdateFoodEntry(input: AddOrUpdateFoodEntryInput!): AddOrUpdateFoodEntryResponse!
  }
`

class FoodEntries {
  entries = [
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

  public getEntries() {
    return this.entries
  }

  public setEntries(data: { id: string; date: string; food: string; servings: number }) {
    const { id, date, food, servings } = data

    const existingEntriesContainsItem = this.entries.find((entry) => entry.id === id)

    if (!existingEntriesContainsItem)
      this.entries.unshift({
        id: id || uuidV4(),
        date,
        food,
        servings,
      })
    else {
      this.entries = this.entries.map((entry) => {
        if (entry.id === id) return { id, date, food, servings }
        return entry
      })
    }
  }
}

const CurrentFoodEntries = new FoodEntries()

const resolvers = {
  Query: {
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return CurrentFoodEntries.getEntries().filter(({ date }) => date === input.date)
    },
  },
  Mutation: {
    addOrUpdateFoodEntry: (_, { input }) => {
      console.log(input)

      CurrentFoodEntries.setEntries(input)

      return { entries: CurrentFoodEntries.getEntries() }
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
