import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().min(2).required("Please Enter password"),
});

export const registerSchema = Yup.object({
  username: Yup.string().min(2).required("Please Enter Name"),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().min(2).required("Please Enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not match")
    .required("Please Enter ConfirmPassword"),
});
