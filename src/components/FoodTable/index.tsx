import { Table, Button, IconButton, Input, DatePicker, InputNumber, CellProps } from 'rsuite'
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc'
import { useState } from 'react'
import { RowDataType } from 'rsuite/esm/Table'
import { useQuery, gql } from '@apollo/client'
import { unique } from 'radash'
import { v4 as uuidV4 } from 'uuid'
import { mockUsers } from '../../../mock'
import { EditableTextCell } from './EditableTextCell'
import { ActionCell } from './ActionCell'
import { useFoodEntriesByDateQuery } from '../../queries/FoodEntriesByDate.generated'
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

const mockFoodEntries: { id: string; food: string; servings: number; status?: string | null }[] = [
  { id: '1', food: 'peanut butter crackers', servings: 1 },
  { id: '2', food: 'pizza', servings: 0.5 },
  { id: '3', food: 'goldfish', servings: 2 },
]

export const FoodTable = () => {
  const [newEntries, setNewEntries] = useState<FoodEntry[]>([])
  const { data: foodEntriesData, loading } = useFoodEntriesByDateQuery({ variables: { input: { date: '11/13/2024' } } })

  const handleChange = (id: string, key: string, value: string | number) => {
    setData((previousData) => {
      return previousData.map((entry) => {
        if (entry.id !== id) return entry
        return { ...entry, [key]: value }
      })
    })
  }

  const handleEdit = (id: string) => {
    setData((previousData) => {
      return previousData.map((entry) => {
        if (entry.id !== id) return entry
        return { ...entry, status: entry.status ? null : 'EDIT' }
      })
    })
  }

  const displayData = unique([...newEntries, ...(foodEntriesData?.foodEntriesByDate || [])], ({ id }) => id)

  return (
    <>
      <style>{styles}</style>

      <Button
        onClick={() => {
          setNewEntries((previousNewEntries) => [{ id: uuidV4(), food: '', servings: 1 }, ...previousNewEntries])
        }}
      >
        Add record
      </Button>
      <hr />
      <Table height={420} data={displayData} loading={loading}>
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
          <ActionCell dataKey="id" onEdit={handleEdit} />
        </Column>
      </Table>
    </>
  )
}
