import { KeyLabelOption, SelectOption } from '../types';

type Props = {
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
    return (
      <option key={key} value={key}>
        {label}
      </option>
    );
  } else {
    return (
      <option key={`option-${option}`} value={option}>
        {option}
      </option>
    );
  }
};

const SelectInput = ({ onChange, options, value }: Props) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <CustomOption option={option} />
      ))}
    </select>
  );
};

export default SelectInput;
