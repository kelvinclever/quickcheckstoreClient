import React, { useContext, useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';
import Logo from '../../../public/images/logo2.jpg';
import { Context } from '../../admin/customerContext/customer.context';

const Login = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const schema = yup.object().shape({
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    Axios.post('http://localhost:8082/auth/login', data)
    .then((response) => {
      const { data } = response;
      if (data && data.token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        setSuccessMessage("Logged in successfully");
        navigate("/cart");
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
    <div className='auth-container'>
      <div className='login-logo'>
        <Link to='/'>
          <img src={Logo} alt='Logo' />
        </Link>
      </div>

      {successMessage && <div className='success-message'>{successMessage}</div>}

      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <h1>LOGIN HERE</h1>
        <input type='text' placeholder='Email' {...register('Email')} />
        <p>{errors.Email?.message}</p>
        <input type='password' placeholder='Password' {...register('Password')} />
        <p>{errors.Password?.message}</p>
        <button type='submit' className='auth-btn'>
          Login
        </button>
        <p>
          Don't have an account? <Link to='/auth/signup'>Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
