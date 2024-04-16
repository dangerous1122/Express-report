import React, { useState } from "react";
import { redirect, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../utils/Slices/authSlice.js";
import { GoogleLogin } from "@react-oauth/google";
import { validateGoogle } from "../utils/Slices/authSlice.js";

export const loginLoader = () => {
  if (localStorage.getItem("expr")) {
    return redirect("/dashboard");
  }
  return 0;
};

function Login() {
  const [email, setEmail] = useState("");
  const { state } = useSelector((state) => state.auth);
  const [password, setPass] = useState("");
  console.log(state)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.includes("@") && password.trim().length >= 6) {
      const data = {
        email,
        password,
      };
      const actionResult = await dispatch(loginUser(data));
      const result = actionResult.payload;
      console.log(result);
      if (loginUser.fulfilled.match(actionResult)) {
        if (result.token) {
          navigate("/dashboard");
        }
      } else {
        console.error("Login failed:");
      }
    }
  };

  const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse.credential);

    const reps = await dispatch(validateGoogle(credentialResponse.credential));
    console.log("respp: ", reps);
    localStorage.setItem("expr", reps.payload.token);
    if (reps.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };
  return (
    <section className="bg-gray-50 h-dvh">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl d">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <Link
                  to="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="mx-auto text-center font-semibold text-gray-700">OR</p>
              <div className="">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <p className="text-sm font-light -my-2 text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
