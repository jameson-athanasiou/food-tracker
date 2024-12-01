import { Firestore } from '@google-cloud/firestore'
import {
  AddFoodEntryInput,
  DeleteFoodEntryInput,
  FoodEntry,
  UpdateExistingFoodEntryInput,
  UpdateFoodNutritionInput,
} from '../../types/types.generated'

const firestore = new Firestore()

const FOOD_DETAILS_COLLECTION_NAME = process.env.NODE_ENV === 'production' ? 'foodDetails' : 'foodDetails-test'
const FOOD_ENTRIES_COLLECTION_NAME = process.env.NODE_ENV === 'production' ? 'foodEntries' : 'foodEntries-test'

export const getFoodDetails = async () => {
  const collection = firestore.collection(FOOD_DETAILS_COLLECTION_NAME)
  const results = await collection.get()

  const documents = results?.docs ?? []

  const formattedDocuments = documents.map((doc) => {
    return { ...doc.data() }
  })

  return formattedDocuments
}

export const getFoodDetailsByFoodName = async (foodName: string) => {
  const collection = await firestore.collection(FOOD_DETAILS_COLLECTION_NAME).where('food', '==', foodName).get()
  return collection.docs.at(0)
}

export const getFoodEntriesByDate = async (date: string): Promise<Pick<FoodEntry, 'id' | 'food' | 'servings'>[]> => {
  const collection = firestore.collection(FOOD_ENTRIES_COLLECTION_NAME)
  const results = await collection.where('date', '==', date).get()

  const documents = results?.docs ?? []
  return documents.map((doc) => ({ id: doc.id, ...doc.data() })) as FoodEntry[]
}

export const addFoodEntry = async (food: AddFoodEntryInput) => {
  const collection = firestore.collection(FOOD_ENTRIES_COLLECTION_NAME)

  const result = await collection.add(food)

  return food
}

export const updateFoodEntry = async (food: UpdateExistingFoodEntryInput) => {
  const collection = await firestore.collection(FOOD_ENTRIES_COLLECTION_NAME).where('id', '==', food.id).get()

  collection.forEach((doc) => doc.ref.update(food))

  return food
}

export const deleteFoodEntry = async (food: DeleteFoodEntryInput) => {
  const collection = await firestore.collection(FOOD_ENTRIES_COLLECTION_NAME).where('id', '==', food.id).get()

  collection.forEach((doc) => doc.ref.delete())

  return food
}

export const updateFoodDetails = async (food: UpdateFoodNutritionInput) => {
  const collection = await firestore.collection(FOOD_DETAILS_COLLECTION_NAME).where('food', '==', food.food).get()

  collection.forEach((doc) => doc.ref.update(food))

  return food
}

export const addFoodDetails = async (food: string) => {
  const collection = await firestore.collection(FOOD_DETAILS_COLLECTION_NAME).add({ food })

  return food
}

// export const insert = async (game: AddGame) => {
//   const collection = firestore.collection('nfl-games')

//   const result = await collection.add(game)

//   return { id: result.id, ...game }
// }

// export const update = async (game: UpdateGame) => {
//   const doc = firestore.collection('nfl-games').doc(game.id)

//   await doc.update(game)

//   const updatedGame = await (await doc.get()).data()

//   return updatedGame as Game
// }
