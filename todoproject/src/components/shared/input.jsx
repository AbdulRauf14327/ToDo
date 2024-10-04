import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Input = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  errors,
  showPassword = false,
  confirmPassword = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="mb-3 relative">
      <label className="font-bold">{label}</label>
      <input
        type={passwordVisible ? "text" : type}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        className="p-2 w-full border rounded-md"
      />
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
      {(showPassword || confirmPassword) && (
        <button type="button" onClick={togglePasswordVisibility}>
          <div className="absolute top-10 right-2">
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </div>
        </button>
      )}
    </div>
  );
};

export default Input;
