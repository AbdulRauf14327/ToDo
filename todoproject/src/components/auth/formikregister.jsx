import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { registerSchema } from "../../schema/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerIntitialValue } from "../../constants/initials";

const API_URL = "http://192.168.100.81:3000/";

const FormikRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
  //   initialValues: intitialValue,
  //   validationSchema: validation,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // console.log(formik);

  return (
    <div className=" flex justify-center items-center h-screen">
      <Formik
        initialValues={registerIntitialValue}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log(values);
          // localStorage.setItem("RegisterData", JSON.stringify(values));
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          isValid,
        }) => (
          <Form
            className="w-[400px] m-auto p-5  border "
            onSubmit={handleSubmit}
          >
            <h1 className=" font-bold py-5 text-center">FORMIK Register</h1>
            {/****************Name****************/}
            <Field
              label="Name"
              type="text"
              name="username"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Name"
              className=" border-2 w-full py-2"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />
            {/* <div>{errors.username && <small>{errors.username}</small>}</div> */}
            {/****************Email****************/}
            <Field
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className=" border-2 mt-5 w-full py-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
            {/* <div> {errors.email && <small>{errors.email}</small>}</div> */}
            {/****************Password****************/}
            <div className="mb-3 relative">
              <Field
                label="Password"
                // type="password"
                type={showPassword ? "password" : "text"}
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                placeholder="******"
                className=" border-2 mt-5 w-full py-2"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-8 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {/* <div>{errors.password && <small>{errors.password}</small>}</div>  */}
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/****************Confirm Password****************/}
            <div className=" relative">
              <Field
                label="Confirm Password"
                // type="password"
                type={showConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
                placeholder="******"
                className=" border-2 mt-1 w-full py-2"
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-4 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {/* <div>{errors.confirmPassword && (<small>{errors.confirmPassword}</small>)}</div> */}
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />

              {/********************* Button *********************/}
            </div>
            <div className=" flex items-center justify-between">
              {/* <button
                className="  bg-green-500 p-2 rounded font-bold mt-5"
                type="submit"
              >
                Submit
              </button> */}
              <button
                className={` p-2 rounded font-bold mt-5 ${
                  !isValid ? "bg-gray-400 cursor-not-allowed" : " bg-green-500"
                }`}
                type="submit"
                disabled={!isValid}
              >
                Submit
              </button>

              <Link
                className=" font-bold pt-3 hover:text-red-500 flex justify-center items-center "
                to="/formiklogin"
              >
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikRegister;
