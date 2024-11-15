import { Table } from 'rsuite'
import { useEffect, useState } from 'react'
import { EditableTextCell } from './EditableTextCell'
import { ActionCell } from './ActionCell'
import { useFoodEntriesByDateQuery, FoodEntriesByDateDocument } from '../../queries/FoodEntriesByDate.generated'
import { useAddOrUpdateFoodEntryMutation } from '../../mutations/AddOrUpdateFoodEntry.generated'
import { FoodEntry } from '../../types.generated'

type FoodTableProps = {
  selectedDate: string
}

const { Column, HeaderCell, Cell } = Table

const styles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
`

export const FoodTable = ({ selectedDate }: FoodTableProps) => {
  const { data: foodEntriesData, loading: foodEntriesLoading } = useFoodEntriesByDateQuery({
    variables: { input: { date: selectedDate } },
  })
  const [addOrUpdateFoodEntry] = useAddOrUpdateFoodEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: FoodEntriesByDateDocument, variables: { input: { date: selectedDate } } }],
  })

  const [allEntries, setAllEntries] = useState<FoodEntry[]>([])

  useEffect(() => {
    setAllEntries(foodEntriesData?.foodEntriesByDate || [])
  }, [foodEntriesData])

  const addRowToEditState = (id: string) => {
    setAllEntries((previousData) => {
      return previousData.map((entry) => {
        if (entry.id !== id) return entry
        return { ...entry, status: 'EDIT' }
      })
    })
  }

  const removeRowFromEditState = (id: string) => {
    setAllEntries((previousData) => {
      return previousData.map((entry) => {
        if (entry.id !== id) return entry
        return { ...entry, status: null }
      })
    })
  }

  const handleChange = (id: string, key: string, value: string | number) => {
    setAllEntries((previousData) => {
      return previousData.map((entry) => {
        if (entry.id !== id) return entry
        return { ...entry, [key]: value }
      })
    })
  }

  const handleEdit = (id: string) => {
    addRowToEditState(id)
  }

  const handleSave = async (id: string) => {
    const entryToSave = allEntries.find((entry) => entry.id === id)
    if (entryToSave && entryToSave.food) {
      removeRowFromEditState(id)
      await addOrUpdateFoodEntry({
        variables: {
          input: {
            id: entryToSave.id,
            date: selectedDate,
            food: entryToSave.food,
            servings: Number(entryToSave.servings),
          },
        },
      })
    }
  }

  return (
    <>
      <style>{styles}</style>
      <hr />
      <Table height={420} data={allEntries} loading={foodEntriesLoading}>
        <Column flexGrow={1}>
          <HeaderCell>Food</HeaderCell>
          <EditableTextCell dataKey="food" handleChange={handleChange} onEdit={handleEdit} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Servings</HeaderCell>
          <EditableTextCell dataKey="servings" handleChange={handleChange} onEdit={handleEdit} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Calcium</HeaderCell>
          <Cell dataKey="calcium" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Protein</HeaderCell>
          <Cell dataKey="protein" />
        </Column>
        <Column width={100}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="id" onEdit={handleEdit} onSave={handleSave} />
        </Column>
      </Table>
    </>
  )
}
