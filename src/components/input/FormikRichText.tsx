// components/FormikQuillEditor.tsx
import { useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useField } from "formik";

interface FormikQuillEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  toolbar?: boolean;
}

const FormikQuillEditor = ({
  name,
  label,
  placeholder,
  toolbar = true,
}: FormikQuillEditorProps) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);

  const modules = {
    toolbar: toolbar
      ? [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ]
      : false,
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  useEffect(() => {
    if (value === undefined || value === null) {
      setValue("");
    }
  }, [value, setValue]);

  return (
    <div className="pb-4 h-44">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 font-medium typography-paragraph-small"
        >
          {label}
        </label>
      )}

      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(content) => {
          setValue(content);
          setTouched(true);
        }}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className=" bg-white h-24"
      />

      {touched && error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default FormikQuillEditor;
