import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { UserContextType } from "../../types";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { apiUrl } from "../../consts";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const { setUser } = useContext(UserContext) as UserContextType;
  const token = Cookies.get("token");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to="/notes" />;
  }

  if (token) {
    return <Navigate to="/notes" />;
  }


  return (
    <div className="max-w-[1000px] my-0 mx-auto flex flex-col justify-center">
      <form onSubmit={handleSubmit} className="w-[50%] mx-auto flex flex-col">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white justify-center mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <div className="w-[50%] mx-auto mt-5">
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
