import React, { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
import { API_URL } from "../../constants";
import Input from "../shared/input";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const togglePasswordVisibility = (checkVisible) => {
    if (checkVisible === "password") {
      setPasswordVisible(!passwordVisible);
    } else if (checkVisible === "confirmPassword") {
      setConfirmPasswordVisible(!confirmPasswordVisible);
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

    if (!formData.username.trim()) {
      validationErrors.username = "username is required";
    }

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

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);

      try {
        const response = await axios.post(
          `${API_URL}person/register`,
          formData
        );

        if (response?.data?.status == true) {
          console.log({ response });
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert(response.data.message);
          setSubmitted(false);
        }

        // alert("Form Submitted successfully");
      } catch (error) {
        console.log({ error });
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form className="w-[400px] m-auto p-5  border" onSubmit={handleSubmit}>
        <h1 className=" font-bold py-5 text-center">REGISTER</h1>
        {/****************Name****************/}
        <Input
          label="Name"
          type="text"
          name="username"
          value={formData?.username}
          placeholder=" Name"
          onChange={handleChange}
          errors={errors.username && errors.username}
        />
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
        <div className="mb-3">
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
          <div>
            {/* <button
            type="button"
            onClick={() => togglePasswordVisibility("password")}
          >
            <div className="absolute top-10 right-2">
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </button> */}
          </div>
        </div>
        {/****************Confirm Password****************/}
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="******"
          value={formData?.confirmPassword}
          onChange={handleChange}
          errors={errors.confirmPassword && errors.confirmPassword}
          confirmPassword
        />
        {/********************* Button *********************/}
        <div className=" flex items-center justify-between">
          <button
            className="  bg-green-500 p-2 rounded font-bold mt-5"
            type="submit"
            disabled={submitted}
            style={{ backgroundColor: submitted ? "gray" : "" }}
          >
            Submit
          </button>
          {/* <a href="./login">Register</a> */}
          <Link className=" font-bold pt-3 hover:text-red-500" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
