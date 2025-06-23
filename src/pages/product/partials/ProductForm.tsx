import { FormikProvider } from "formik";

import FormikInput from "@/components/input/FormikInput";

const AddProductForm = ({ formik }: { formik: any }) => {
  return (
    <div className="flex items-center justify-center bg-background-100">
      <div className="w-full max-w-md px-8 py-10 rounded-3xl flex flex-col text-text-500 ">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <FormikInput
              label="Product Name"
              name="name"
              placeholder="Enter product name"
            />
            <FormikInput
              label="Price"
              name="price"
              type="number"
              placeholder="Enter price"
            />
            <FormikInput
              label="Description"
              name="description"
              placeholder="Enter product description"
            />

            <button
              type="submit"
              className="mt-2 w-full bg-secondary-500 text-white font-semibold py-3 rounded-full shadow-box transition-colors typography-paragraph-small cursor-pointer"
            >
              + Add Product
            </button>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default AddProductForm;
