import { AddFoodEntryInput } from '../../types/types.generated'
import * as firestore from './firestore'
import LocalDatabase from './local'

const isProduction = process.env.NODE_ENV === 'production'

export const getExistingFoodEntries = () => {
  if (isProduction) return firestore.getFoodEntries()
  return LocalDatabase.getExistingFoodItems()
}

export const getExistingFoodDetails = () => {
  if (isProduction) return firestore.getFoodDetails()
  return LocalDatabase.getNutrition()
}

export const addFoodEntry = (input: AddFoodEntryInput) => {
  if (isProduction) return firestore.addFoodEntry(input)
  return LocalDatabase.addEntry(input)
}
