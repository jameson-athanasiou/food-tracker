export default `#graphql

  input AddFoodEntryInput {
    id: String!
    date: String!
    food: String!
    servings: Float!
    calcium: Float
    protein: Float
  }

  input UpdateExistingFoodEntryInput {
    id: String!
    food: String
    servings: Float
  }

  input FoodEntriesByDateInput {
    date: String!
  }

  input DeleteFoodEntryInput {
    id: String!
  }

  type FoodEntry {
    id: ID!
    food: String!
    servings: Float!
    calcium: Float
    protein: Float
  }

  type DeleteFoodEntryResponse {
    deletedId: ID!
    success: Boolean!
  }

  type Query {
    foodEntriesByDate(input: FoodEntriesByDateInput!): [FoodEntry!]!
  }

  type Mutation {
    addFoodEntry(input: AddFoodEntryInput!): FoodEntry!
    deleteFoodEntry(input: DeleteFoodEntryInput!): DeleteFoodEntryResponse!
    updateExistingFoodEntry(input: UpdateExistingFoodEntryInput!): FoodEntry!
  }
`
