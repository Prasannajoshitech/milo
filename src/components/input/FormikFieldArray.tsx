import { useField, FieldArray } from "formik";
import { useState } from "react";
import { IoTrash } from "react-icons/io5";

interface FormikSuggestionsInputProps {
  name: string;
  label: string;
  placeholder1?: string;
  placeholder2?: string;
  objectKey1: string;
  objectKey2?: string; // made optional
}

interface Suggestion {
  [key: string]: string;
}

const FormikFieldArray: React.FC<FormikSuggestionsInputProps> = ({
  name,
  label,
  placeholder1 = "Enter first value",
  placeholder2 = "Enter second value (optional)",
  objectKey1,
  objectKey2,
}) => {
  const [field, meta] = useField(name);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  return (
    <div className="mb-4">
      <label className="text-text-500 font-semibold typography-paragraph-regular mb-2.5">
        {label}
      </label>

      <FieldArray name={name}>
        {({ push, remove }) => (
          <>
            <div className="flex flex-wrap gap-2 my-3">
              <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder={placeholder1}
                className="border border-gray-400 rounded px-3 py-2 flex-1"
              />
              {objectKey2 && (
                <input
                  type="text"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  placeholder={placeholder2}
                  className="border border-gray-400 rounded px-3 py-2 flex-1"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  if (input1.trim()) {
                    push({
                      [objectKey1]: input1.trim(),
                      ...(objectKey2 && { [objectKey2]: input2.trim() }),
                    });
                    setInput1("");
                    setInput2("");
                  }
                }}
                className="bg-secondary-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>

            <ul className="flex flex-wrap gap-2">
              {field.value && field.value.length > 0 ? (
                field.value.map((item: Suggestion, index: number) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border border-secondary-500 rounded px-4 py-1 w-fit "
                  >
                    <span>
                      {item[objectKey1]}
                      {objectKey2 &&
                        item[objectKey2] &&
                        ` — ${item[objectKey2]}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-xs"
                    >
                      <IoTrash />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  No {label.toLowerCase()} added.
                </p>
              )}
            </ul>

            {meta.touched && meta.error && (
              <p className="text-red-500 text-xs mt-1">
                {meta.error as string}
              </p>
            )}
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default FormikFieldArray;
