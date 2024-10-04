import React, { createContext, useContext, useState } from "react";
import { API_URL } from "../../constants";
import Input from "../shared/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const AuthContext = createContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (checkVisible) => {
    if (checkVisible === "password") {
      setPasswordVisible(!passwordVisible);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "password is required";
    } else if (formData.password.length < 3) {
      validationErrors.password = "password should be at least 6 char";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${API_URL}person/login`, formData);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
        if (response?.data?.status == true) {
          console.log({ response });

          alert(response.data.message);
        }
      } catch (error) {
        console.log({ error });
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form className="w-[400px] m-auto p-5  border" onSubmit={handleSubmit}>
        <h1 className=" font-bold py-5 text-center">LOGIN</h1>

        {/****************Email****************/}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData?.email}
          placeholder="example@gmail.com"
          onChange={handleChange}
          errors={errors.email && errors.email}
        />

        {/****************Password****************/}

        <div className="mb-[-20px]">
          <Input
            label="Password"
            // type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="******"
            value={formData?.password}
            onChange={handleChange}
            errors={errors.password && errors.password}
            showPassword
            type="password"
          />
        </div>

        {/********************* Button *********************/}

        <div className=" flex items-center justify-between">
          <button
            className="  bg-green-500 p-2 rounded font-bold mt-5"
            type="submit"
          >
            Submit
          </button>
          <Link className=" font-bold pt-5 hover:text-red-500" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
