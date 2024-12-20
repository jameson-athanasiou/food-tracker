import { v4 as uuidV4 } from 'uuid'
import { Maybe } from '../../types/types.generated'

export class LocalDatabase {
  entries = [
    {
      id: '78e3c73c-fabb-47fd-ace4-5f374dc9bdaf',
      date: '11/13/2024',
      food: 'pizza',
      servings: 2,
    },
    {
      id: 'bc89c02b-631e-4899-ab59-a8d9c791b032',
      date: '11/13/2024',
      food: 'crackers',
      servings: 1,
    },
  ]

  nutrition = {
    pizza: {
      calcium: 20,
      protein: 40,
    },
    crackers: {
      calcium: 30,
      protein: 10.4,
    },
  }

  public getExistingFoodItems() {
    return Object.entries(this.nutrition).map(([foodName, nutritionFacts]) => ({
      food: foodName,
      calcium: nutritionFacts.calcium,
      protein: nutritionFacts.protein,
    }))
  }

  public getNutrition() {
    return this.nutrition
  }

  public setNutrition(data: { food: string; calcium?: Maybe<number>; protein?: Maybe<number> }) {
    this.nutrition = {
      ...this.nutrition,
      [data.food]: {
        calcium: data.calcium || 0,
        protein: data.protein || 0,
      },
    }
  }

  public getEntries() {
    return this.entries
  }

  public setEntries(data: { id: string; date: string; food: string; servings: number }) {
    const { id, date, food, servings } = data

    const existingEntriesContainsItem = this.entries.find((entry) => entry.id === id)

    if (!existingEntriesContainsItem)
      this.entries.unshift({
        id: id || uuidV4(),
        date,
        food,
        servings,
      })
    else {
      this.entries = this.entries.map((entry) => {
        if (entry.id === id) return { id, date, food, servings }
        return entry
      })
    }
  }

  public addEntry(data: {
    id: string
    date: string
    food: string
    servings: number
    calcium?: Maybe<number>
    protein?: Maybe<number>
  }) {
    const { id, date, food, servings, calcium, protein } = data
    this.entries.unshift({
      id: id || uuidV4(),
      date,
      food,
      servings,
    })

    if (calcium || protein) {
      this.setNutrition({ food, calcium, protein })
    }
  }

  public getEntry({ id }: { id: string }) {
    const existingEntry = this.entries.find((entry) => entry.id === id)

    return existingEntry
  }

  public updateEntry(data: { id: string; food?: Maybe<string>; servings?: Maybe<number> }) {
    const { id, food, servings } = data

    const existingEntriesContainsItem = this.entries.find((entry) => entry.id === id)
    if (!existingEntriesContainsItem) throw new Error('No existing entry found')

    this.entries = this.entries.map((entry) => {
      if (entry.id === id) return { ...entry, ...(food && { food }), ...(servings && { servings }) }
      return entry
    })
  }

  public deleteEntry({ id }: { id: string }) {
    const existingEntriesContainsItem = this.entries.find((entry) => entry.id === id)

    if (!existingEntriesContainsItem) throw new Error('No existing entry found')

    this.entries = this.entries.filter((existingEntry) => existingEntry.id !== id)
  }
}

const FoodEntriesSingleton = new LocalDatabase()

export default FoodEntriesSingleton
