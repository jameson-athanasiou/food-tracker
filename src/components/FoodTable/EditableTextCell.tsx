import { Table, Input, CellProps } from 'rsuite'
import { RowDataType } from 'rsuite/esm/Table'

const { Cell } = Table

interface RowData {
  [index: string]: string | number
  id: string
  status: string
  food: string
  servings: number
}

export const EditableTextCell = ({
  rowData,
  dataKey,
  handleChange,
  onEdit,
  ...props
}: CellProps<RowData> & {
  onEdit: (id: string) => void
  dataKey: string
  handleChange: (id: string, key: string, value: string | number) => void
}) => {
  const value = rowData?.[dataKey]
  const editing = rowData?.status === 'EDIT'

  return (
    <Cell
      {...props}
      className={editing ? 'table-cell-editing' : ''}
      onDoubleClick={() => {
        onEdit?.(rowData?.id as string)
      }}
    >
      {editing ? (
        <Input
          defaultValue={value}
          onChange={(val) => {
            handleChange?.(rowData.id, dataKey, val)
          }}
        />
      ) : (
        value
      )}
    </Cell>
  )
}
