import clsx from "clsx";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Field from "../../components/form/field";
import { AuthContext } from "../../context/context";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [admin, setAdmin] = useState(false);
  const { authLogin } = useContext(AuthContext);

  const onSubmit = (data) => {
    authLogin({
      data: {
        ...data,
        role: admin ? "admin" : "user",
      },
      reset,
    });
  };
  return (
    <div className="flex min-h-[100vh-124px] container mx-auto">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between px-12 pb-12 relative">
        <div className="text-white">
          <img
            src="./assets/Saly-1.png"
            alt="Illustration"
            className="mx-auto"
          />
          <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
          <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
          <p className="mb-8">
            Logging in unlocks your personal progress tracker, letting you
            evaluate your performance and see how you stack up against others.
            Whether you&apos;re preparing for exams, improving your knowledge,
            or simply having fun, there&apos;s no better way to sharpen your
            mind.
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
            <span>Welcome to</span>
            <img src="./assets/logo.svg" className="h-7" />
          </h2>
          <h1 className="text-5xl font-bold mb-8">Sign in</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field label="Enter your username or email address" id="username">
              <input
                type="text"
                id="username"
                className={clsx(
                  "w-full px-4 py-3 rounded-lg border border-gray-300",
                  errors.email && "border-red-500"
                )}
                placeholder="Username or email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </Field>
            <Field label="Enter your password" id="password">
              <input
                type="password"
                id="password"
                className={clsx(
                  "w-full px-4 py-3 rounded-lg border border-gray-300",
                  errors.password && "border-red-500"
                )}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </Field>

            <div className="mb-6 flex gap-2 items-center">
              <input
                type="checkbox"
                id="admin"
                checked={admin}
                onChange={() => setAdmin(!admin)}
                className="px-4 py-3 rounded-lg border border-gray-300"
              />
              <label htmlFor="admin" className="block ">
                Login as Admin
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg mb-4"
            >
              Sign in
            </button>
          </form>
          <div className="text-center">
            <a href="#" className="text-primary">
              Forgot Password
            </a>
          </div>
          <div className="mt-8">
            <p className="text-center">
              No Account ?{" "}
              <Link to={"/registration"} className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
