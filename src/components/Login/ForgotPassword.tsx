import logo from "../../assests/logo.svg";
import "./Login.css";
import axiosInstance from "../../utils/axiosInstance";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface ForgotPasswordProps {
  // Define any props you may want to pass to this component
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users", {
        email,
        action: "forgot_password",
      });
      const token = response.data.token;
      setResetToken(response.data.token);
      localStorage.setItem("resetToken", response.data.token);
      setSuccessMessage(
        "An email has been sent to your inbox with instructions on how to reset your password."
      );
      setError("");
    } catch (error) {
      console.log(error);
      setError("Password reset failed. Please check your email address.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen bg">
      <div className="bg-white w-full absolute top-0">
        <div className="px-10 pt-">
          <img src={logo} alt="Papedaz logo" />
        </div>
      </div>
      <div className="bg-white h-auto rounded-xl shadow-2xl w-auto md:w-[30%] ">
        <div>
          <div className="border-b w-full flex justify-center ">
            <h1 className="text-3xl mt-6 mb-4">
              Super <span className="col ">Admin</span>
            </h1>
          </div>
          {/* Success Message */}
          {successMessage && (
            <div className="text-green-500 text-center mt-4">
              {successMessage}
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
          <form className="" onSubmit={handleSubmit}>
            <div className="w-[90%] mt-10 mx-auto">
              <label className="text-xl"> Email</label>
              <input
                placeholder="Enter Email Address"
                className="w-full bg-white px-5 py-3 rounded-lg border-solid border-gray-300 border-2  mt-2 outline-none  "
                type="text"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className="w-full my-10 flex justify-center items-center">
              <button
                type="submit"
                className="bg-green-400 hover:bg-green-500 hover:ease-in-out hover:transition-all text-white font-bold w-[70%] py-3 rounded-lg"
              >
                {isLoading ? "Logging in..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;