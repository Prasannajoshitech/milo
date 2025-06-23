import { FormikProvider } from "formik";
import { Eye, EyeOff } from "lucide-react";
import FormikInput from "@/components/input/FormikInput";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import { PATH } from "@/constants/paths";

const Login = () => {
  const { formik, showPassword, setShowPassword, isloadingLogin } = useLogin();
  return (
    <div className="flex justify-center items-center bg-background-100 min-h-screen">
      <div className="relative flex flex-col items-center px-8 py-10 rounded-3xl w-auto text-text-500">
        <img
          src="./logo.webp"
          alt="milo Logo"
          className="mb-3 h-14 object-contain"
        />
        <h1 className="mt-2 mb-2 font-bold text-center typography-h2">
          Log in
        </h1>
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col mt-6 w-full"
          >
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
                className="top-1/2 right-2 absolute h-max text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 starting:scale-50 transition-all" />
                ) : (
                  <Eye className="w-5 h-5 starting:scale-50 transition-all" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isloadingLogin}
              className="bg-secondary-500 shadow-box mt-2 py-3 rounded-full w-full font-semibold text-white transition-colors cursor-pointer typography-paragraph-regular"
            >
              {isloadingLogin ? "Logging in..." : "Log In"}
            </button>

            <span className="mt-6 font-semibold text-center typography-paragraph-regular">
              Don't have an account?{" "}
              <Link
                to={PATH.signup}
                className="font-medium text-secondary-500 hover:underline"
              >
                Create account
              </Link>
            </span>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
