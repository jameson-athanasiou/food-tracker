import { useState } from 'react';
import { DatePicker } from 'rsuite';

export const DateSelection = () => {
    console.log('ddate');

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    return <DatePicker oneTap value={selectedDate} onChange={(selection) => setSelectedDate(selection)}/>
}