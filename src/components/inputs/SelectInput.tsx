import { useMemo } from 'react';
import { KeyLabelOption, SelectOption } from '../../types';

type Props = {
  id: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  value: number | string;
};

const isKeyLabelOption = (option: SelectOption): option is KeyLabelOption => {
  return (option as KeyLabelOption).key !== undefined;
};

const CustomOption = ({ option }: { option: SelectOption }): JSX.Element => {
  if (isKeyLabelOption(option)) {
    const { key, label } = option;
    return <option value={key}>{label}</option>;
  } else {
    return <option value={option}>{option}</option>;
  }
};

const SelectInput = ({ onChange, options, value, id }: Props) => {
  const memoOptions: any = useMemo(() => {
    const getOptions = () => (
      <>
        {options.map((option, index) => (
          <CustomOption key={index} option={option} />
        ))}
      </>
    );
    return getOptions();
  }, [options]);

  return (
    <select id={id} value={value} onChange={onChange}>
      {memoOptions}
    </select>
  );
};

export default SelectInput;
