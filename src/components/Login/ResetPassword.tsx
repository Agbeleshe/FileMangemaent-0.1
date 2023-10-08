import logo from "../../assests/logo.svg";

import "./Login.css";
import axiosInstance from "../../utils/axiosInstance";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import jwt_decode from "jwt-decode";

interface ResetPasswordProps {
  // Define any props you may want to pass to this component
}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const query = new URLSearchParams(window.location.search);

  const token = query.get("token");
  console.log(token); //123

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.patch("/users", {
        newPassword: password,
        action: "reset_password",
        token: token, // Include the token in the request payload
      });

      // Assuming the API response is successful, update your success message or other logic here
      setSuccessMessage(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("User not found");
      } else {
        console.error("API Error:", error);
        setError("Password reset failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    // Replace "your.jwt.token.here" with the actual JWT token you intend to decode
    const token = "your.jwt.token.here";

    try {
      const decoded = jwt_decode(token);
      console.log(decoded);
      // You can access the decoded token properties like decoded.sub, decoded.exp, etc.
    } catch (err) {
      // Handle decoding errors here
      console.error(error);
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
          <div className="border-b w-full flex justify-center font-medium ">
            <h1 className="text-3xl mt-6 mb-4">
              Super <span className="col ">Admin</span>
              <span className="text-xs">Reset password</span>
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
              <label className="text-xl"> New Password</label>
              <div className="relative">
                <input
                  placeholder="Enter Password"
                  className="w-full px-5 py-3 rounded-lg border-solid border-gray-300 border-2 mt-2 outline-none"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <span
                  className="absolute top-7 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
              </div>
            </div>

            <div className="w-full my-10 flex justify-center items-center">
              <button
                type="submit"
                className=" bg-[#75C05F] shadow-2xl outline-none hover:bg-[#648c51] hover:ease-in-out hover:transition-all text-white font-bold w-[70%] py-3 rounded-lg"
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

export default ResetPassword;
