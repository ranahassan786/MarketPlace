import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginScreen from '../screens/LoginScreen'
import { PostApi } from "../util/ApiMethod";
import { loginApi } from "../util/Routes";
const Login = () => {
        const [showPassword, setShowPassword] = useState(false);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
 

const handleLogin = async (values) => {
    try {
        setLoading(true);

        const Payload = {
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30,
        };

        const URL = loginApi;

        const data = await PostApi(Payload, URL);

        if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/Home");
} else {
    alert(data.message);
}

       
    } catch (error) {
        alert(error.message);
    } finally {
        setLoading(false);
    }
};

         const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required")
            //  .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number"),
        }),
        onSubmit: async (values) => {
    await handleLogin(values);
},
    });

    return (
        <LoginScreen
            formik={formik}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            navigate={navigate}
            loading={loading}
        />
    )
}

export default Login
