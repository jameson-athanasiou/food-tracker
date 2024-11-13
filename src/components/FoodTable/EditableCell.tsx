import { Table, CellProps } from 'rsuite'

const { Column, HeaderCell, Cell } = Table

export const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, ...props }: CellProps) => {
  const editing = rowData.status === 'EDIT'

  const Field = fieldMap[dataType]
  const value = rowData[dataKey]
  const text = toValueString(value, dataType)

  return (
    <Cell
      {...props}
      className={editing ? 'table-cell-editing' : ''}
      onDoubleClick={() => {
        onEdit?.(rowData.id)
      }}
    >
      {editing ? (
        <Field
          defaultValue={value}
          onChange={(value) => {
            onChange?.(rowData.id, dataKey, value)
          }}
        />
      ) : (
        text
      )}
    </Cell>
  )
}
