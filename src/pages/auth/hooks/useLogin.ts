import { PATH } from "@/constants/paths";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "@/store/slice/authSlice";
import { showSucessMessage } from "@/utils/toast";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const initialValues: FormValues = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(login(values.email));
        showSucessMessage("Login successful");
        navigate(PATH.product);
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    showPassword,
    setShowPassword,
    isloadingLogin: formik.isSubmitting,
  };
};

export default useLogin;
