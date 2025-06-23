import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/slice/productSlice";

export const useAddProductForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        addProduct({
          name: values.name,
          price: Number(values.price),
          description: values.description,
        })
      );
      onClose();
      resetForm();
    },
  });
  return {
    formik,
  };
};
