import { useField } from "formik";

interface FormikTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  styles?: string;
  inputstyles?: string;
}

const FormikTextarea: React.FC<FormikTextareaProps> = ({
  label,
  rows = 4,
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
        <textarea
          id={props.name}
          {...field}
          {...props}
          rows={rows}
          className={`border border-background-600 rounded-lg py-3 px-2 text-text-300 bg-[#F9F6F8] typography-paragraph-small font-medium outline-none resize-none ${props.inputstyles}`}
        />
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikTextarea;
