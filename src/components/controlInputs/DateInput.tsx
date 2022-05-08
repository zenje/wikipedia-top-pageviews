import { memo } from 'react';
import { START_DATE } from '../../utils/strings';
import DatePicker from '../inputs/DatePicker';
import ControlInput from './ControlInput';

type Props = {
  date: Date;
  onChange: (date: Date, event: React.SyntheticEvent<any> | undefined) => void;
  datePickerOptions: {};
};

const MemoDatePicker = memo(DatePicker);

const DateInput = ({ date, onChange, datePickerOptions }: Props) => {
  return (
    <ControlInput label={START_DATE} labelHtmlFor="start-date">
      <MemoDatePicker
        id="start-date"
        date={date}
        onChange={onChange}
        {...datePickerOptions}
      />
    </ControlInput>
  );
};

export default memo(DateInput);
