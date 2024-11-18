import { Firestore } from '@google-cloud/firestore'
import { AddFoodEntryInput, FoodEntry, UpdateFoodNutritionInput } from '../../types/types.generated'

const firestore = new Firestore()

const foodDetailsCollectionName = process.env.NODE_ENV === 'production' ? 'foodDetails' : 'foodDetails-test'
const foodEntriesCollectionName = process.env.NODE_ENV === 'production' ? 'foodEntries' : 'foodEntries-test'

export const getFoodDetails = async () => {
  const collection = firestore.collection(foodDetailsCollectionName)
  const results = await collection.get()

  const documents = results?.docs ?? []

  const formattedDocuments = documents.map((doc) => {
    return { ...doc.data() }
  })

  return formattedDocuments
}

export const getFoodEntriesByDate = async (date: string): Promise<Pick<FoodEntry, 'id' | 'food' | 'servings'>[]> => {
  const collection = firestore.collection(foodEntriesCollectionName)
  const results = await collection.where('date', '==', date).get()

  const documents = results?.docs ?? []
  return documents.map((doc) => ({ id: doc.id, ...doc.data() })) as FoodEntry[]
}

export const addFoodEntry = async (food: AddFoodEntryInput) => {
  const collection = firestore.collection(foodEntriesCollectionName)

  const result = await collection.add(food)

  return food
}

export const updateFoodDetails = async (food: UpdateFoodNutritionInput) => {
  const collection = await firestore.collection(foodDetailsCollectionName).where('food', '==', food.food).get()

  collection.forEach((doc) => doc.ref.update(food))

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
