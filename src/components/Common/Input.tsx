interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: IInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}:</label>
      <input {...props} />
    </div>
  );
};

export default Input;
