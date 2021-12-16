import React, {useState} from 'react';
// import './Signup.css';
import InputField from '../components/InputField';
import axios from 'axios';

export default function Signup(props) {
  const [data, setData] = useState({
    userName: "",
    password: "",
    phoneNumber: "",
    email: "",
  });
  const handleChange = (e) => {
    if (e.target.name === "UserName")
      setData({ ...data, userName: e.target.value });
    else if (e.target.name === "password")
      setData({ ...data, password: e.target.value });
    else if (e.target.name === "phone")
      setData({ ...data, phoneNumber: e.target.value });
    else setData({ ...data, email: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(data);
      const res = await axios({
        method: "POST",
        url: "http://localhost:4500/signup",
        data,
      });
      if (res.data.status === "success") {
        setData({ userName: "", password: "", phoneNumber: "", email: "" });
        alert("New user added");
        console.log(res.data);
      } else {
        throw new Error("ERRORS");
      }
      
    } catch (err) {
      alert(err.message);
    }
  };
    let drawerClasses = ['side-drawer'];
    if (props.show){
        drawerClasses = 'side-drawer open';
    }
    return(  
      <div>
      <h1 className="text-2x1 font-medium text-primary mt-4 mb-12 text-center">
        Registration
      </h1>
      <form onSubmit={handleFormSubmit}>
        <InputField
          type="text"
          name="UserName"
          text="UserName"
          holder="Your UserName"
          value={data.userName}
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          inputChange={handleChange}
        />

        <InputField
          type="email"
          name="email"
          text="email"
          holder="example@gamil.com"
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

        <InputField
          type="tel"
          name="phone"
          text="phoneNumber"
          holder="03XX-XXX-XXXXX"
          value={data.phoneNumber}
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
          inputChange={handleChange}
        />
        <div className="flex justify-center items-center mt-6">
          <button
            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}>
            Register
          </button>
        </div>
      </form>
    </div>
    )
}