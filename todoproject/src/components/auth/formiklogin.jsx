import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { loginSchema } from "../../schema/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginIntitialValue } from "../../constants/initials";

const FormikLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  // console.log(formik);

  return (
    <div className=" flex justify-center items-center h-screen">
      <Formik
        initialValues={loginIntitialValue}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
          // localStorage.setItem("loginData", JSON.stringify(values));
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
            <h1 className=" font-bold py-5 text-center">FORMIK Login</h1>

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
              {/* <div>
                  {" "}
                  {errors.password && <small>{errors.password}</small>}
                </div> */}
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/********************* Button *********************/}

            <div className=" flex items-center justify-between">
              {/* <button
                className="  bg-green-500 p-2 rounded font-bold mt-5"
                type="submit"
              >
                Submit
              </button> */}
              <button
                className={`p-2 rounded font-bold mt-5 ${
                  !isValid ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                }`}
                type="submit"
                disabled={!isValid}
              >
                Submit
              </button>

              <Link
                className=" font-bold pt-3 hover:text-red-500 flex justify-center items-center"
                to="/formikregister"
              >
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikLogin;
