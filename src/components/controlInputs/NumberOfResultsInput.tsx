import { ChangeEvent, memo } from 'react';
import { SelectOption } from '../../types';
import { NUMBER_OF_RESULTS } from '../../utils/strings';
import SelectInput from '../inputs/SelectInput';
import ControlInput from './ControlInput';

type Props = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  value: number;
};

const MemoSelectInput = memo(SelectInput);

const NumberOfResultsInput = ({ onChange, options, value }: Props) => {
  return (
    <ControlInput label={NUMBER_OF_RESULTS} labelHtmlFor="number-of-results">
      <MemoSelectInput
        id="number-of-results"
        onChange={onChange}
        options={options}
        value={value}
      />
    </ControlInput>
  );
};

export default memo(NumberOfResultsInput);
