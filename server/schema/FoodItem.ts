export default `#graphql
  type ExistingFood {
    food: String!
    calcium: Float
    protein: Float
  }

  input UpdateFoodNutritionInput {
    food: String!
    calcium: Float
    protein: Float
  }

  type Query {
    existingFoodItems: [ExistingFood!]!
  }

  type Mutation {
    updateFoodNutrition(input: UpdateFoodNutritionInput!): ExistingFood!
  }
`
