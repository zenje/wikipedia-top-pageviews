import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  date: Date | null;
  maxDate?: Date | null;
  minDate?: Date | null;
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ) => void;
};

const DatePicker = ({ date, maxDate, minDate, onChange }: Props) => {
  return (
    <div className="date-picker-wrapper">
      <ReactDatePicker
        selected={date}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DatePicker;
