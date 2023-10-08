import logo from "../../assests/logo.svg";
import "./Login.css";
import axiosInstance from "../../utils/axiosInstance";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidError, BiSolidCheckCircle } from "react-icons/bi";
import { DotLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";

interface LoginProps {
  // Define any props you may want to pass to this component
}

const Login: React.FC<LoginProps> = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const strategy = "local";
  useEffect(() => {
    // Check if the email is stored in localStorage and set the state accordingly
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/authentication?",
        {
          email,
          password,
          strategy,
        },
        {
          timeout: 10000, // Adjust this value as needed
        }
      );
      console.log(response);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      //  Redirect to a protected page or perform other actions as needed
      // console.log("You are successfully logged in!");
      // onLoginSuccess();
      // Store the email if "Remember Me" is checked

      //saving email in local storage
      localStorage.setItem("rememberedEmail", email);
      //using my redux to save it
      dispatch(login(email));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/paperLink");
    } catch (error) {
      setError("Login failed. Please check your credentials.");

      // Automatically clear the error after 10 seconds
      setTimeout(() => {
        setError("");
      }, 10000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-full  pb-20 bg font-Poppins">
      {/* top nav */}
      <div className="w-full md:pb-28 z-20 ">
        <div className="px-10 bg-white w-full py-2  mb-20 top-0  fixed shadow-lg">
          <img src={logo} alt="Papedaz logo" />
        </div>
      </div>

      {/* form container */}
      <div className="bg-white h-auto  rounded-xl shadow-custom mt-40 md:mt-0 w-[70%] md:w-[45%] lg:w-[36%] ">
        <div>
          <div className="border-b w-full flex justify-center font-meduim ">
            <h1 className="md:text-[32px] text-[32px] mt-6 mb-4">
              Super<span className="col ">Admin</span>
            </h1>
          </div>
          {/* form */}

          <form className="h-auto" onSubmit={handleSubmit}>
            {!isLoading && error && (
              <div className="bg-red-500 p-5 mx-auto w-[90%] rounded-lg mt-5 font-semibold  text-white flex md:text-sm text-xs justify-start">
                <div className="flex gap-2  justify-start">
                  <span>
                    <BiSolidError size={35} />
                  </span>
                  <p className="  align-middle flex justify-start text-left items-center">
                    Ops, password or email is incorrect!!
                  </p>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="bg-green-500 p-5 mx-auto w-[90%] text-green-300 border-2 border-[#75C05F] rounded-lg mt-5 font-semibold  flex md:text-sm text-xs justify-center">
                <div className="flex gap-2">
                  <span>
                    <BiSolidCheckCircle size={35} />
                  </span>
                  <p className="  align-middle flex justify-center text-center t items-center">
                    please wait, redirecting...
                  </p>
                  <div className="align-middle flex justify-center text-center t items-center ">
                    <DotLoader color="green" size={25} loading={true} />
                  </div>
                </div>
              </div>
            )}
            <div className="w-[90%] mt-10 mx-auto">
              <label className="md:text-sm text-xs "> Email</label>
              <input
                title="Please fill in your email address "
                placeholder="Enter email address"
                className={`w-full bg-white md:px-3 md:py-4 p-2 text-xs md:text-sm rounded-lg border-solid mt-2 outline-none ${
                  error ? "input-error" : "input-nutral "
                }`}
                type="text"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className="w-[90%] mt-10 mx-auto">
              <label className="md:text-sm text-xs "> Password</label>
              <div className="relative">
                <input
                  title="Please fill in your Password "
                  minLength={3}
                  placeholder="Enter password"
                  className={`w-full bg-white md:px-3 md:py-4 p-2 text-xs  md:text-sm rounded-lg border-solid mt-2 outline-none ${
                    error ? "input-error" : "input-nutral "
                  }`}
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <span
                  className="absolute top-5 right-4 cursor-pointer"
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
            <div className="flex text-xs md:text-lg  w-[88%] mx-auto mt-5">
              <div className="flex gap-3 flex-1 w-[50%]">
                <input
                  className="h-full w-3  md:w-5 border-gray-300 rounded-2xl outline-none  "
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <p className="cursor-pointer flex text-xs md:text-sm  justify-start items-center align-middle text-[#707070] ">
                  Remember me
                </p>
              </div>
              <div>
                <a
                  className="text-[#FF7373] cursor-pointer hover:underline-offset-1 text-xs md:text-sm hover:underline flex justify-start items-center align-middle "
                  href="/forgotPassword"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="w-full  my-10 flex justify-center items-center">
              <button
                type="submit"
                className=" bg-[#75C05F] shadow-2xl outline-none hover:bg-[#6b9558] hover:ease-in-out hover:transition-all text-white font-bold w-[70%] py-3 rounded-lg"
              >
                {isLoading ? (
                  <span className="flex w-[80%] md:w-[50%] mx-auto justify-between">
                    <div>
                      <DotLoader size={20} color="white" />
                    </div>{" "}
                    <p>Logging in...</p>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
