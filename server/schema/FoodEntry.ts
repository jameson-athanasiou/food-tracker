export default `#graphql

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

  type Query {
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addOrUpdateFoodEntry(input: AddOrUpdateFoodEntryInput!): AddOrUpdateFoodEntryResponse!
  }
`
