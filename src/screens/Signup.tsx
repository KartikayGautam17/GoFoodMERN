import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");
  const [location, SetLocation] = useState("");
  const HandleRegistration = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/Create_User/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ name, password, email, location }),
    });
    if (response.ok) {
      alert("Signed Up Successfully");
    } else if (response.status === 400) {
      alert("Invalid Credentials");
    } else {
      alert(String(response.status) + " Error");
    }
    // console.log({ name, password, email, location });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full"></div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        }  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Register for a free account
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onChange={(e) => {
                  SetName(e.target.value);
                }}
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                placeholder="Your name"
              />
            </div>
            <input
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="email"
              placeholder="Enter your email"
            />

            <input
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(e) => {
                SetLocation(e.target.value);
              }}
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="text"
              placeholder="Your Address"
            />
            <button
              onClick={HandleRegistration}
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Register</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="text-[#E9522C] font-semibold">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
