import { CellProps, Table, Button, IconButton, Input, DatePicker, InputNumber } from 'rsuite'
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc'

const { Column, HeaderCell, Cell } = Table

interface RowData {
  [index: string]: string | number
  id: string
  status: string
  food: string
  servings: number
}

export const ActionCell = ({
  rowData,
  dataKey,
  onEdit,
  ...props
}: CellProps<RowData> & { onEdit: (id: string) => void }) => {
  return (
    <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px' }}>
      <IconButton
        appearance="subtle"
        icon={rowData?.status === 'EDIT' ? <VscSave /> : <VscEdit />}
        onClick={() => {
          onEdit(rowData?.id as string)
        }}
      />
      <IconButton
        appearance="subtle"
        icon={<VscRemove />}
        onClick={() => {
          // onRemove(rowData?.id)
        }}
      />
    </Cell>
  )
}
