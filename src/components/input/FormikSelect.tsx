import { useField } from "formik";
import { IoMdArrowDropdown } from "react-icons/io";

interface FormikSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  styles?: string;
  inputstyles?: string;
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <div>
      <div className={`${props.styles} flex flex-col relative gap-1 mb-3`}>
        <label
          htmlFor={props.name}
          className="text-text-500 font-semibold typography-paragraph-regular mb-2.5"
        >
          {label}
        </label>
        <select
          id={props.name}
          {...field}
          {...props}
          className={`border relative border-background-600 rounded-lg py-3 px-2 text-text-400 bg-white typography-paragraph-regular  outline-none appearance-none bg-[] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1rem_1rem] ${props.inputstyles}`}
        >
          <option value="" disabled>
            {props.placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IoMdArrowDropdown className="absolute right-3 top-3/4  transform -translate-y-1/2 text-black" />
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs -mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikSelect;
