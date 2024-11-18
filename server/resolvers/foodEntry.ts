import { FoodEntry, Resolvers } from '../../types/types.generated'
import LocalDatabase from '../database/local'
import { addFoodEntry, updateFoodDetails, getFoodEntriesByDate } from '../database/firestore'

const resolvers: Resolvers = {
  Mutation: {
    addFoodEntry: async (_, { input }) => {
      // LocalDatabase.addEntry(input)
      // LocalDatabase.setNutrition(input)

      const promises: Promise<unknown>[] = []

      promises.push(addFoodEntry({ id: input.id, food: input.food, date: input.date, servings: input.servings }))

      if (input.calcium || input.protein) {
        promises.push(
          updateFoodDetails({
            food: input.food,
            ...(input.calcium && { calcium: input.calcium }),
            ...(input.protein && { protein: input.protein }),
          })
        )
      }

      await Promise.all(promises)

      return input
    },
    deleteFoodEntry: (_, { input }) => {
      LocalDatabase.deleteEntry(input)
      return { success: true, deletedId: input.id }
    },
    updateExistingFoodEntry: (_, { input }) => {
      LocalDatabase.updateEntry(input)
      return LocalDatabase.getEntry({ id: input.id }) as FoodEntry
    },
  },
  Query: {
    foodEntriesByDate: async (_, { input }) => {
      console.log(input)

      const entries = await getFoodEntriesByDate(input.date)
      return entries
    },
  },
  FoodEntry: {
    calcium: ({ food }) => {
      return LocalDatabase.getNutrition()[food]?.calcium || 0
    },
    protein: ({ food }) => {
      return LocalDatabase.getNutrition()[food]?.protein || 0
    },
  },
}

export default resolvers
