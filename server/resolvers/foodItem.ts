import { Resolvers } from '../../types/types.generated'
import FoodEntriesSingleton from '../FoodEntries'

const resolvers: Resolvers = {
  Mutation: {
    updateFoodNutrition: (_, { input }) => {
      FoodEntriesSingleton.setNutrition(input)

      return input
    },
  },
  Query: {
    existingFoodItems: () => {
      return FoodEntriesSingleton.getExistingFoodItems()
    },
  },
}

export default resolvers
