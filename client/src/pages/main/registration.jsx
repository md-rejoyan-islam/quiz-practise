import clsx from "clsx";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../components/form/field";
import { AuthContext } from "../../context/context";

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { authRegister } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    authRegister({
      data: {
        ...data,
        role: admin ? "admin" : "user",
      },
      reset,
      navigate,
    });
  };
  return (
    <main className="flex min-h-[100vh-124px] container mx-auto">
      {/* Left side */}
      <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between px-12 pb-12  h-full ">
        <div className="text-white">
          <img
            src="./assets/Saly-1.png"
            alt="Illustration"
            className="mx-auto"
          />
          <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
          <p className="text-xl mb-4 font-medium">
            Boost Your Learning Capabilities
          </p>
          <p className="mb-8 max-w-lg">
            Logging in unlocks your personal progress tracker, letting you
            evaluate your performance and see how you stack up against others.
            Whether you&apos;re preparing for exams, improving your knowledge,
            or simply having fun, there&apos;s no better way to sharpen your
            mind.
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-12 overflow-y-auto xl:overflow-hidden">
        <div className="w-full max-w-lg ">
          <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
            <span>Welcome to</span>
            <img src="./assets/logo.svg" className="h-7" />
          </h2>
          <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <Field label="Full Name" id="name">
                <input
                  type="text"
                  id="name"
                  className={clsx(
                    "w-full px-4 py-3 rounded-lg border border-gray-300",
                    errors.full_name && "border-red-500"
                  )}
                  placeholder="John Doe"
                  {...register("full_name", {
                    required: "Full Name is required",
                  })}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">
                    {errors.full_name.message}
                  </p>
                )}
              </Field>
              <Field label="email" id="email">
                <input
                  type="text"
                  id="email"
                  className={clsx(
                    "w-full px-4 py-3 rounded-lg border border-gray-300",
                    errors.email && "border-red-500"
                  )}
                  placeholder="Email address"
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
            </div>
            <div className="flex  gap-4">
              <Field label="Enter your Password" id="password">
                <input
                  type="password"
                  id="password"
                  className={clsx(
                    "w-full px-4 py-3 rounded-lg border border-gray-300",
                    errors.email && "border-red-500"
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
              <Field label="Confirm Password" id="confirm-password">
                <input
                  type="password"
                  id="confirm-password"
                  className={clsx(
                    "w-full px-4 py-3 rounded-lg border border-gray-300",
                    errors.confirmPassword && "border-red-500"
                  )}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    minLength: {
                      value: 6,
                      message:
                        "confirm Password must have at least 6 characters",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>
            </div>
            <div className="mb-6 flex gap-2 items-center">
              <input
                type="checkbox"
                id="admin"
                className="px-4 py-3 rounded-lg border border-gray-300"
                checked={admin}
                onChange={() => setAdmin(!admin)}
              />
              <label htmlFor="admin" className="block ">
                Register as Admin
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg mb-2"
            >
              Create Account
            </button>
          </form>
          <div className="mt-2 text-gray-400">
            <p className="text-center">
              Already have account ?{" "}
              <Link to={"/login"} className="text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
