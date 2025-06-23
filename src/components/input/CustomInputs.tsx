import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  id,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label
        htmlFor={id}
        className="text-base typography-paragraph-large font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        {...props}
        className="border border-gray-300 rounded-xl p-3 text-text-300 bg-gray-100 typography-paragraph-regular font-medium outline-none"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextInput;
