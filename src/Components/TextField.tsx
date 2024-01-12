import React, { ChangeEventHandler } from "react";
import "./TextField.css";
interface TextFieldProps {
  type: string;
  placeholder?: string;
  suffixIcon?: React.ReactNode;
  name: string;
  label?: string;
  required?: boolean;
  width?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}
const TextField = ({
  type,
  placeholder,
 
  name,
 
  value,
  required,
  onChange,
  width,
}: TextFieldProps) => {
  return (
    <input
      className="textField "
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange && onChange}
      value={value && value}
      required={required}
      style={{ width: `${width}rem` }}
    />
  );
};

export default TextField;
