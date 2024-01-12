import { ChangeEventHandler } from "react";
import "./TextAreaField.css";

interface TextAreaFieldProps {
  placeholder?: string;
  name: string;
  label?: string;
  height?: number;
  width?: number;
  require?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const TextAreaField = ({
  placeholder,
  name,
  height,
  width,
  onChange,
  require,
  value,
}: TextAreaFieldProps) => {
  return (
    <textarea
      className="textArea"
      name={name}
      onChange={onChange && onChange}
      id=""
      cols={width ? width : 30}
      rows={height ? height : 10}
      placeholder={placeholder}
      required={require}
      value={value && value}
    ></textarea>
  );
};

export default TextAreaField;
