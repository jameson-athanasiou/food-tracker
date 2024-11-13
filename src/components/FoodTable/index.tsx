import { Table, Button, IconButton, Input, DatePicker, InputNumber, CellProps } from 'rsuite'
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc'
import { useState } from 'react'
import { RowDataType } from 'rsuite/esm/Table'
import { useQuery, gql } from '@apollo/client'
import { mockUsers } from '../../../mock'
import { EditableTextCell } from './EditableTextCell'
import { ActionCell } from './ActionCell'

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`

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
  const [data, setData] = useState(mockFoodEntries)
  const { loading, error, data: booksData } = useQuery(GET_BOOKS)

  console.log(booksData)

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

  return (
    <>
      <style>{styles}</style>

      <Button
        onClick={() => {
          setData([{ id: (data.length + 1).toString(), food: '', servings: 1 }, ...data])
        }}
      >
        Add record
      </Button>
      <hr />
      <Table height={420} data={data}>
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
