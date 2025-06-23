import { useField } from "formik";

interface FormikInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputstyles?: string;
  styles?: string;
}

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <div>
      <div className={`${props.styles} flex flex-col gap-1 mb-3`}>
        <label
          htmlFor={props.name}
          className="text-text-500 font-semibold typography-paragraph-small mb-2.5"
        >
          {label}
        </label>
        <input
          id={props.name}
          {...field}
          {...props}
          type={type}
          className={`border border-background-600 rounded-lg py-3 px-2 text-text-400 bg[#F9F6F8] typography-paragraph-small  outline-none ${props.inputstyles} `}
        />
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs -mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikInput;
