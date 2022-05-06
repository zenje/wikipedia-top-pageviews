import { ChangeEvent } from 'react';
import { NUM_RESULTS_OPTIONS } from '../utils/constants';
import { NUMBER_OF_RESULTS, START_DATE } from '../utils/strings';
import { getDatePickerOptions } from '../utils/utils';
import DatePicker from './DatePicker';
import SelectInput from './SelectInput';

type Props = {
  date: Date | null;
  handleDateChange: (
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectValue: number;
};

const ControlInputs = ({
  date,
  handleDateChange,
  handleSelectChange,
  selectValue,
}: Props) => {
  return (
    <div className="top-pages-input">
      <div className="input-item">
        <div className="input-item-wrapper">
          <label htmlFor="start-date">{START_DATE}</label>
          <DatePicker
            date={date}
            onChange={handleDateChange}
            {...getDatePickerOptions()}
          />
        </div>
      </div>
      <div className="input-item">
        <div className="input-item-wrapper">
          <label htmlFor="number-of-results">{NUMBER_OF_RESULTS}</label>
          <SelectInput
            onChange={handleSelectChange}
            options={NUM_RESULTS_OPTIONS}
            value={selectValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlInputs;
