import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  date: Date;
  id: string;
  maxDate?: Date | null;
  minDate?: Date | null;
  onChange: (date: Date, event: React.SyntheticEvent<any> | undefined) => void;
};

const DatePicker = ({ date, id, maxDate, minDate, onChange }: Props) => {
  return (
    <div className="date-picker-wrapper">
      <ReactDatePicker
        id={id}
        selected={date}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DatePicker;
