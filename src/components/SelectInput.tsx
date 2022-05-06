type Props = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: number[] | string[];
  value: number | string;
};

const SelectInput = ({ onChange, options, value }: Props) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={`option-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
