import { Message, Table, useToaster } from 'rsuite'
import { useCallback, useEffect, useState } from 'react'
import { EditableTextCell } from './EditableTextCell'
import { ActionCell } from './ActionCell'
import { useFoodEntriesByDateQuery, FoodEntriesByDateDocument } from '../../queries/FoodEntriesByDate.generated'
import { useUpdateExistingFoodEntryMutation } from '../../mutations/UpdateExistingFoodEntry.generated'
import { FoodEntry } from '../../../types/types.generated'
import { useDeleteFoodEntryMutation } from '../../mutations/DeleteFoodEntry.generated'
import { defaultToasterOptions } from '../Toast'

type FoodTableProps = {
  selectedDate: string
}

const { Column, HeaderCell, Cell } = Table

const tableStyles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
`

export const FoodTable = ({ selectedDate }: FoodTableProps) => {
  const toaster = useToaster()

  const { data: foodEntriesData, loading: foodEntriesLoading } = useFoodEntriesByDateQuery({
    variables: { input: { date: selectedDate } },
  })
  const [updateFoodEntry] = useUpdateExistingFoodEntryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: FoodEntriesByDateDocument, variables: { input: { date: selectedDate } } }],
  })

  const [deleteFoodEntry] = useDeleteFoodEntryMutation({
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

  const handleDelete = useCallback(
    (id: string) => {
      deleteFoodEntry({ variables: { input: { id } } })
    },
    [deleteFoodEntry]
  )

  const handleSave = async (id: string) => {
    const entryToSave = allEntries.find((entry) => entry.id === id)
    if (entryToSave && entryToSave.food) {
      removeRowFromEditState(id)
      try {
        await updateFoodEntry({
          variables: {
            input: {
              id: entryToSave.id,
              food: entryToSave.food,
              servings: Number(entryToSave.servings),
            },
          },
        })
        toaster.push(
          <Message showIcon type={'success'}>
            Food entry updated!
          </Message>,
          defaultToasterOptions
        )
      } catch (e) {
        console.error(e)
        toaster.push(
          <Message showIcon type={'error'}>
            Failed to update food entry
          </Message>,
          defaultToasterOptions
        )
      }
    }
  }

  return (
    <>
      <style>{tableStyles}</style>
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
          <ActionCell dataKey="id" onEdit={handleEdit} onSave={handleSave} onDelete={handleDelete} />
        </Column>
      </Table>
    </>
  )
}
