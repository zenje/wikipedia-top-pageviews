import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <ReactDatePicker
      selected={date}
      onChange={(selectedDate) => setDate(selectedDate)}
    />
  );
};

export default DatePicker;
