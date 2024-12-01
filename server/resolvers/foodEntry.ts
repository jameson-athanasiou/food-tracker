import { FoodEntry, Resolvers } from '../../types/types.generated'
import LocalDatabase from '../database/local'
import {
  addFoodEntry,
  updateFoodDetails,
  getFoodEntriesByDate,
  updateFoodEntry,
  deleteFoodEntry,
  getFoodDetailsByFoodName,
  addFoodDetails,
} from '../database/firestore'

const resolvers: Resolvers = {
  Mutation: {
    addFoodEntry: async (_, { input }) => {
      // LocalDatabase.addEntry(input)
      // LocalDatabase.setNutrition(input)

      const promises: Promise<unknown>[] = []

      promises.push(addFoodEntry({ id: input.id, food: input.food, date: input.date, servings: input.servings }))

      const foodDetailsEntryExists = await getFoodDetailsByFoodName(input.food)

      if (!foodDetailsEntryExists) {
        await addFoodDetails(input.food)
      }

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
    deleteFoodEntry: async (_, { input }) => {
      // LocalDatabase.deleteEntry(input)
      await deleteFoodEntry(input)
      return { success: true, deletedId: input.id }
    },
    updateExistingFoodEntry: async (_, { input }) => {
      // LocalDatabase.updateEntry(input)
      // return LocalDatabase.getEntry({ id: input.id }) as FoodEntry
      await updateFoodEntry(input)
      return input as FoodEntry
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
    calcium: async ({ food }) => {
      // return LocalDatabase.getNutrition()[food]?.calcium || 0
      return (await getFoodDetailsByFoodName(food))?.get('calcium') || 0
    },
    protein: async ({ food }) => {
      // return LocalDatabase.getNutrition()[food]?.protein || 0
      return (await getFoodDetailsByFoodName(food))?.get('protein') || 0
    },
  },
}

export default resolvers
