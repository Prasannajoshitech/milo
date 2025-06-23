import { PATH } from "@/constants/paths";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "@/store/slice/authSlice";
import { showSucessMessage } from "@/utils/toast";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

const useSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(signup(values));
        showSucessMessage("Signup successful");
        navigate(PATH.login);
      } catch (error) {
        console.error("Signup failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    showPassword,
    setShowPassword,
    isLoadingSignup: formik.isSubmitting,
  };
};

export default useSignup;
