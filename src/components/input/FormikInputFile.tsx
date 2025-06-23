import { useField, useFormikContext } from "formik";
import React, { useState, useEffect } from "react";

interface FormikFileInputProps {
  label: string;
  name: string;
  styles?: string;
  inputstyles?: string;
  accept?: string;
  preview?: string;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormikFileInputWithPreview: React.FC<FormikFileInputProps> = ({
  label,
  styles,
  inputstyles,
  accept = "image/*",
  preview,
  setPreview,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setLoading(true);
      setFieldValue(props.name, file);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview?.(objectUrl);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  console.warn(field, "field");
  return (
    <div>
      <div className={`${styles} flex flex-col gap-1 mb-3`}>
        <label
          htmlFor={props.name}
          className="text-text-500 font-semibold typography-paragraph-small mb-2.5"
        >
          {label}
        </label>
        <input
          id={props.name}
          type="file"
          accept={accept}
          onChange={handleChange}
          className={`border border-background-600 rounded-lg py-3 px-2 text-text-400 bg-[#F9F6F8] typography-paragraph-small  cursor-pointer outline-none ${inputstyles}`}
        />
        {/* Display loading indicator */}
        {loading && (
          <div className="relative mt-2 h-32 w-32">
            <svg
              className="absolute inset-0 w-full h-full animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="12"
                fill="url(#grad)"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e0e0e0" />
                  <stop offset="50%" stopColor="#f0f0f0" />
                  <stop offset="100%" stopColor="#e0e0e0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        {/* Display preview */}
        {preview && !loading && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-32 w-32 object-cover rounded-lg border"
          />
        )}
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs -mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikFileInputWithPreview;
