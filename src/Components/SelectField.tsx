import { ChangeEventHandler } from "react";
import "./SelectField.css";
interface SelectFieldProps {
  name: string;
  label?: string;
  options: string[];
  required?: boolean;
  width?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

const SelectField = ({
  name,
  label,
  required,
  options,
  onChange,value,
  width,
}: SelectFieldProps) => {
  return (
    <div className="selectField flex">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id=""
        required={required}
        style={{ width: `${width}rem` }}
        onChange={onChange && onChange}
        value={value && value}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
