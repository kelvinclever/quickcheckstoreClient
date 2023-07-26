import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';
import Logo from '../../../public/images/logo2.jpg';

const Signup = () => {
  const schema = yup.object().shape({
    FirstName: yup.string().required('First Name is required'),
    LastName: yup.string().required('Last Name is required'),
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('Password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add the reset method from react-hook-form
  } = useForm({
    resolver: yupResolver(schema),
  });

//   const history = useHistory();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data) => {
    Axios.post('http://localhost:8082/customers/new', data)
      .then((response) => {
        console.log('Signup successful!', response.data);
        setSuccessMessage('Signup successful! Please login with your new account.');
        // Clear the form fields after successful signup
        reset();
        // Navigate to the login page after a short delay (e.g., 2 seconds)
        // setTimeout(() => {
        //   history.push('/auth/login');
        // }, 2000);
      })
      .catch((error) => {
        console.error('Signup error:', error);
        // You can display an error message here if needed
      });
  };

  return (
    <div>
      <div className='auth-container'>
        <div className='login-logo'>
          <Link to='/'>
            <img src={Logo} alt='Logo' />
          </Link>
        </div>

        {successMessage && (
          <div className='success-message-container'>
            {/* The success message */}
            <div className='success-message'>{successMessage}</div>
           <Link to="/auth/login">
            <h1>login</h1>
          
            </Link>
        
          </div>
        )}

        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome</h1>
          <p>Create Account</p>
          <input type='text' placeholder='First Name' {...register('FirstName')} />
          <p>{errors.FirstName?.message}</p>
          <input type='text' placeholder='Last Name' {...register('LastName')} />
          <p>{errors.LastName?.message}</p>
          <input type='email' placeholder='Email' {...register('Email')} />
          <p>{errors.Email?.message}</p>
          <input type='password' placeholder='Password' {...register('Password')} />
          <p>{errors.Password?.message}</p>
          <input
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword')}
          />
          <p>{errors.confirmPassword?.message}</p>
          <button type='submit' className='auth-btn'>
            Signup
          </button>
          <p>
            Already have an account? <Link to='/auth/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
