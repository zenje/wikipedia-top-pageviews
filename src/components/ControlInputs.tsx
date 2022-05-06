import { ChangeEvent } from 'react';
import { NUM_RESULTS_OPTIONS } from '../utils/constants';
import { COUNTRY, NUMBER_OF_RESULTS, START_DATE } from '../utils/strings';
import { getCountryOptions, getDatePickerOptions } from '../utils/utils';
import DatePicker from './DatePicker';
import SelectInput from './SelectInput';

type ControlInputsProps = {
  countryValue?: string;
  date: Date | null;
  handleCountryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ) => void;
  handleNumResultsChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  numResultsValue: number;
};

type ControlInputProps = {
  label: string;
  labelHtmlFor: string;
  children: JSX.Element | JSX.Element[];
};

const ControlInput = ({ label, labelHtmlFor, children }: ControlInputProps) => {
  return (
    <div className="input-item">
      <div className="input-item-wrapper">
        <label htmlFor={labelHtmlFor}>{label}</label>
        {children}
      </div>
    </div>
  );
};

const ControlInputs = ({
  countryValue = '',
  date,
  handleCountryChange,
  handleDateChange,
  handleNumResultsChange,
  numResultsValue,
}: ControlInputsProps) => {
  return (
    <div className="top-pages-input">
      <ControlInput label={START_DATE} labelHtmlFor="start-date">
        <DatePicker
          date={date}
          onChange={handleDateChange}
          {...getDatePickerOptions()}
        />
      </ControlInput>
      <ControlInput label={COUNTRY} labelHtmlFor="country">
        <SelectInput
          onChange={handleCountryChange}
          options={getCountryOptions()}
          value={countryValue}
        />
      </ControlInput>
      <ControlInput label={NUMBER_OF_RESULTS} labelHtmlFor="number-of-results">
        <SelectInput
          onChange={handleNumResultsChange}
          options={NUM_RESULTS_OPTIONS}
          value={numResultsValue}
        />
      </ControlInput>
    </div>
  );
};

export default ControlInputs;
