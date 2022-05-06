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

export default ControlInput;
