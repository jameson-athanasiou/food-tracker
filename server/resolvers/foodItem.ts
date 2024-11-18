import { Resolvers } from '../../types/types.generated'
import LocalDatabase from '../database/local'

const resolvers: Resolvers = {
  Mutation: {
    updateFoodNutrition: (_, { input }) => {
      LocalDatabase.setNutrition(input)

      return input
    },
  },
  Query: {
    existingFoodItems: () => {
      return LocalDatabase.getExistingFoodItems()
    },
  },
}

export default resolvers
