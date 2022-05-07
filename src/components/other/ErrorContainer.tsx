type Props = {
  message: string;
};

const ErrorContainer = ({ message }: Props) => {
  return (
    <div className="error-container">
      <span>{message}</span>
    </div>
  );
};

export default ErrorContainer;
