
import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { loginFields } from "../constants/formFields";
import { API_URL_LOGIN } from '../constants/constants';

let fieldsState = {};
loginFields.forEach(field => fieldsState[field.name] = '');

function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();

  const handleChange = event => {
    setLoginState({...loginState, [event.target.id]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(API_URL_LOGIN, loginState).then(
      // On success
      ( data ) => {
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        navigate('');
      },
      // On error
      ({ response }) => {
        setLoginState({
          ...loginState,
          [loginFields[1].name]: ''
        });
        setErrorState(response.data.message)
        setTimeout(() => {
          setErrorState(null)
        }, 5000);
      }
    );
  }

  return(
    <LoginForm
      state={loginState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title="Login to your account"
      subtitle="Don't have an account?"
      link="Register now"
      linkUrl="/register"
      fields={loginFields}
      buttonLabel="Login"
      error={errorState}
    />
  );
}

export default Login;
