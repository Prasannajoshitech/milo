import { FormikProvider } from "formik";
import { Eye, EyeOff } from "lucide-react";
import FormikInput from "@/components/input/FormikInput";
import { Link } from "react-router-dom";
import useSignup from "./hooks/useSignup";
import { PATH } from "@/constants/paths";

const Signup = () => {
  const { formik, showPassword, setShowPassword } = useSignup();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-100">
      <div className="w-auto px-8 py-10 rounded-3xl  flex flex-col text-text-500 items-center relative">
        <img
          src="./logo.webp"
          alt="milo Logo"
          className="h-14 mb-3 object-contain"
        />
        <h1 className="typography-h2 font-bold text-center  mb-2 mt-2">
          Create new Account
        </h1>
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col mt-6 "
          >
            <FormikInput
              label="Name"
              name="name"
              autoComplete="name"
              placeholder="Enter your name"
            />
            <FormikInput
              label="Email"
              name="email"
              autoComplete="email"
              placeholder="Enter email"
              type="email"
            />
            <div className="relative">
              <FormikInput
                label="Password"
                name="password"
                autoComplete="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-2 top-8.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-secondary-500 text-white font-semibold py-3 rounded-full shadow-box transition-colors typography-paragraph-small cursor-pointer "
            >
              Sign Up
            </button>

            <span className="text-center typography-paragraph-regular font-semibold mt-6">
              Already have an account? {""}
              <Link
                to={PATH.login}
                className="text-secondary-500 hover:underline font-medium"
              >
                Return to Sign In
              </Link>
            </span>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Signup;
