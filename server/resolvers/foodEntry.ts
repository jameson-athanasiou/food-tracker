import { Resolvers } from '../../types/types.generated'
import FoodEntriesSingleton from '../FoodEntries'

const resolvers: Resolvers = {
  Mutation: {
    addOrUpdateFoodEntry: (_, { input }) => {
      console.log(input)

      FoodEntriesSingleton.setEntries(input)
      FoodEntriesSingleton.setNutrition(input)

      return { entries: FoodEntriesSingleton.getEntries() }
    },
  },
  Query: {
    foodEntriesByDate: (_, { input }) => {
      console.log(input)

      return FoodEntriesSingleton.getEntries().filter(({ date }) => date === input.date)
    },
  },
}

export default resolvers
