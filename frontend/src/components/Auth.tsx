import { SignupInput } from "@krishbhavsar/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    name: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
    name?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const validateInputs = () => {
    const errors: any = {};
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!postInputs.username || !emailRegex.test(postInputs.username)) {
      errors.username = "Please enter a valid email.";
    }

    if (postInputs.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (type === "signup" && !postInputs.name) {
      errors.name = "Name is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function sendRequest() {
    if (!validateInputs()) return;

    setLoading(true); 

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e: any) {
      console.error(e);
      if (e.response && e.response.data) {
        setError(
          e.response.data.message || "Something went wrong, please try again."
        );
      } else {
        setError("Network error, please try again later.");
      }
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold text-center">
          {type === "signin" ? "Sign In" : "Create an account"}
        </div>
        <div className="text-center text-slate-400">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            className="pl-2 underline"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

        {type === "signup" && (
          <LabelledInput
            label="Name"
            placeholder="Krish Bhavsar..."
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
            error={formErrors.name}
          />
        )}

        <LabelledInput
          label={"Email"}
          placeholder={"m@example.com"}
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              username: e.target.value,
            }));
          }}
          error={formErrors.username}
        />

        <LabelledInput
          label={"Password"}
          type={"password"}
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
          error={formErrors.password}
        />

        <button
          onClick={sendRequest}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 mt-5 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 relative flex items-center justify-center"
        >
          {loading ? (
            <div className="spinner-border animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6"></div>
          ) : type === "signup" ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  error,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className={`bg-gray-50 border ${
          error ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        placeholder={placeholder}
        required
      />

      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
