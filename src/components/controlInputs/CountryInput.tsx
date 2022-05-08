import { ChangeEvent, memo } from 'react';
import { SelectOption } from '../../types';
import { COUNTRY } from '../../utils/strings';
import SelectInput from '../inputs/SelectInput';
import ControlInput from './ControlInput';

type Props = {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  value: string;
};

const MemoSelectInput = memo(SelectInput);

const CountryInput = ({ onChange, options, value }: any) => {
  return (
    <ControlInput label={COUNTRY} labelHtmlFor="country">
      <MemoSelectInput
        id="country"
        onChange={onChange}
        options={options}
        value={value}
      />
    </ControlInput>
  );
};

export default memo(CountryInput);
