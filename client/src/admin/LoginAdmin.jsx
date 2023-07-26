import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Context } from "./customerContext/customer.context";
import Axios from "axios";
import "./login.css";

const LoginAdmin = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const schema = yup.object().shape({
    username: yup.string().required("username is a must"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    Axios.post(`http://localhost:8082/admins/loginadmin`, data)
      .then((response) => {
        const { data } = response;
        if (data && data.token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
          setSuccessMessage("Logged in successfully");
          navigate("/admin");
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
          const errorMessage = data && data.message ? data.message : "Invalid email or password";
          alert(errorMessage);
        }
      })
      .catch((error) => {
        console.log(error.response);
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An error occurred during login.";
        alert(errorMessage);
      });
  };
  
  return (
    <div className="signup">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <p className="title">
          <button data-text="Awesome" className="button">
            <span className="actual-text">&nbsp;ADMIN&nbsp;</span>
            <span className="hover-text" aria-hidden="true">
              &nbsp;ADMINLOGIN&nbsp;
            </span>
          </button>
        </p>
        <p className="message">Welcome back ADMIN</p>
        <label>
        <input
            required=""
            placeholder="kevo12"
            type="text"
            className="input"
            {...register("username")}
          />
        </label>
        <label>
         
           <input
            required=""
            placeholder="@gmail.com"
            type="email"
            className="input"
            {...register("email")}
          />
          <span>Email</span>
        </label>
       
        <p>{errors.email?.message}</p>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input"
            {...register("password")}
          />
          <span>Password</span>
        </label>
        <p>{errors.password?.message}</p>

        <button className="buttonlogin" type="submit">
          Login
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
        <p className="signin">
          Not admin? <a href="/">go back home</a>
        </p>
      </form>
    </div>
  );
};

export default LoginAdmin;
