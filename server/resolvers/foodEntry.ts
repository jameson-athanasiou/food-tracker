import { FoodEntry, Resolvers } from '../../types/types.generated'
import FoodEntriesSingleton from '../FoodEntries'

const resolvers: Resolvers = {
  Mutation: {
    addFoodEntry: (_, { input }) => {
      FoodEntriesSingleton.addEntry(input)
      FoodEntriesSingleton.setNutrition(input)

      return input
    },
    deleteFoodEntry: (_, { input }) => {
      FoodEntriesSingleton.deleteEntry(input)
      return { success: true, deletedId: input.id }
    },
    updateExistingFoodEntry: (_, { input }) => {
      FoodEntriesSingleton.updateEntry(input)
      return FoodEntriesSingleton.getEntry({ id: input.id }) as FoodEntry
    },
  },
  Query: {
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return FoodEntriesSingleton.getEntries().filter(({ date }) => date === input.date)
    },
  },
  FoodEntry: {
    calcium: ({ food }) => {
      return FoodEntriesSingleton.getNutrition()[food]?.calcium || 0
    },
    protein: ({ food }) => {
      return FoodEntriesSingleton.getNutrition()[food]?.protein || 0
    },
  },
}

export default resolvers
