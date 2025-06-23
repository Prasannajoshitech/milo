import { useField } from "formik";
import Creatable from "react-select/creatable";

interface FormikSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  containerStyles?: string;
  inputstyles?: string;
}

const FormikReactSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

  // Handle both selection from dropdown and creation of new options
  const handleChange = (selectedOption: string) => {
    helpers.setValue(selectedOption);
  };

  // Add new option handling
  const handleCreate = (inputValue: string) => {
    const newOption = { label: inputValue, value: inputValue.toLowerCase() };
    helpers.setValue(newOption);
  };

  return (
    <div>
      <div
        className={`${props.containerStyles} flex flex-col relative gap-1 mb-3`}
      >
        <label
          htmlFor={props.name}
          className="text-text-500 font-semibold typography-paragraph-regular mb-2.5"
        >
          {label}
        </label>
        <Creatable
          id={props.name}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          onBlur={field.onBlur}
          options={options}
          onCreateOption={handleCreate}
          className="text-text-400 bg-white typography-paragraph-regular outline-none "
          classNamePrefix="react-select"
          placeholder={
            props.placeholder || "Select or type to create an option"
          }
        />
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs -mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikReactSelect;
