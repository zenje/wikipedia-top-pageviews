import { ChangeEvent, useMemo } from 'react';
import { NUM_RESULTS_OPTIONS } from '../../utils/constants';
import { getCountryOptions, getDatePickerOptions } from '../../utils/utils';
import CountryInput from '../controlInputs/CountryInput';
import DateInput from '../controlInputs/DateInput';
import NumberOfResultsInput from '../controlInputs/NumberOfResultsInput';

type ControlInputsProps = {
  countryValue?: string;
  date: Date;
  handleCountryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (
    date: Date,
    event: React.SyntheticEvent<any> | undefined
  ) => void;
  handleNumResultsChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  numResultsValue: number;
};

const ControlInputs = ({
  countryValue = '',
  date,
  handleCountryChange,
  handleDateChange,
  handleNumResultsChange,
  numResultsValue,
}: ControlInputsProps) => {
  const datePickerOptions = useMemo(() => {
    return getDatePickerOptions();
  }, []);

  const countryOptions = useMemo(() => {
    return getCountryOptions();
  }, []);

  return (
    <div className="top-pages-input">
      <DateInput
        date={date}
        onChange={handleDateChange}
        datePickerOptions={datePickerOptions}
      />
      <CountryInput
        onChange={handleCountryChange}
        options={countryOptions}
        value={countryValue}
      />
      <NumberOfResultsInput
        onChange={handleNumResultsChange}
        options={NUM_RESULTS_OPTIONS}
        value={numResultsValue}
      />
    </div>
  );
};

export default ControlInputs;
