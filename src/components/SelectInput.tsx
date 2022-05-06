type Props = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: number[] | string[];
  selectedValue: number | string;
};

const SelectInput = ({ onChange, options, selectedValue }: Props) => {
  return (
    <select value={selectedValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={`option-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
