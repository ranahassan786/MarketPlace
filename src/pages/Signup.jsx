import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SignupScreen from '../screens/SignupScreen';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number"),
    }),
    onSubmit: (values) => {

        localStorage.setItem("user", JSON.stringify(values));
            navigate("/Home");
        }
    
  });
  return (
     <SignupScreen formik={formik} 
     showPassword={showPassword} 
     setShowPassword={setShowPassword} 
     navigate={navigate} 
     agree={agree} 
     setAgree={setAgree}
     />
  )
}
  export default Signup
  