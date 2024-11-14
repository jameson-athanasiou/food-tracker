import { Table, Button } from 'rsuite'
import { useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { EditableTextCell } from './EditableTextCell'
import { ActionCell } from './ActionCell'
import { useFoodEntriesByDateQuery, FoodEntriesByDateDocument } from '../../queries/FoodEntriesByDate.generated'
import { useAddOrUpdateFoodEntryMutation } from '../../mutations/AddOrUpdateFoodEntry.generated'
import { FoodEntry } from '../../types.generated'

const { Column, HeaderCell, Cell } = Table

const styles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
`

export const FoodTable = () => {
  const { data: foodEntriesData, loading: foodEntriesLoading } = useFoodEntriesByDateQuery({
    variables: { input: { date: '11/13/2024' } },
  })
  const [addOrUpdateFoodEntry, { loading: addOrUpdateFoodEntryLoading }] = useAddOrUpdateFoodEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: FoodEntriesByDateDocument, variables: { input: { date: '11/13/2024' } } }],
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
            date: '11/13/2024',
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

      <Button
        onClick={() => {
          const newEntryId = uuidV4()
          setAllEntries((previousNewEntries) => [
            { id: newEntryId, food: '', servings: 1, status: 'EDIT' },
            ...previousNewEntries,
          ])
        }}
      >
        Add record
      </Button>
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
        <Column width={100}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="id" onEdit={handleEdit} onSave={handleSave} />
        </Column>
      </Table>
    </>
  )
}
