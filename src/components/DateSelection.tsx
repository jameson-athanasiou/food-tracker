import { Dispatch, SetStateAction, useState } from 'react'
import { DatePicker } from 'rsuite'

type DateSelectionProps = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}

export const DateSelection = ({ selectedDate, setSelectedDate }: DateSelectionProps) => {
  return (
    <DatePicker
      cleanable={false}
      format={'MM/dd/yyyy'}
      oneTap
      value={selectedDate}
      onChange={(selection) => setSelectedDate(selection as Date)}
    />
  )
}
