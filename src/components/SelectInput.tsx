type Props = {
  options: number[] | string[];
};

const SelectInput = ({ options }: Props) => {
  return (
    <select>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default SelectInput;
