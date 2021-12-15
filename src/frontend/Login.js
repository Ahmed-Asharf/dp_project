import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "email") setData({ ...data, email: e.target.value });
    else setData({ ...data, password: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    try {
      console.log(data);
      e.preventDefault();
      const res = await axios({
        method: "POST",
        url: "http://localhost:4500/login",
        data,
      });
      if (res.data.status === "success") {
        //redirect to dashboard
        setRedirect(true);
        alert(res.data.status);

      } else {
        throw new Error("Email and Password does not exist");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <h1 className="text-2x1 font-medium text-primary mt-4 mb-12 text-center">
        Log in to your account 🔐
      </h1>
      <form onSubmit={handleFormSubmit}>
        <InputField
          type="text"
          name="email"
          text="Email"
          holder="Username"
          value={data.email}
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          inputChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          text="Password"
          holder="Your Password"
          value={data.password}
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          inputChange={handleChange}
        />
        <div className="flex justify-center items-center mt-6">
          <button
            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
          >
            Login
          </button>
          {redirect && history.push(`/dashboard?name=${data.email}`)}
        </div>
      </form>
    </>
  );
}
