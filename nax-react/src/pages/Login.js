
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

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await axios.post(API_URL_LOGIN, loginState);
    if (res.status === 200) {
      const data = res.data;
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      navigate('/');
    } else {
      setLoginState({
        ...loginState,
        [loginFields[1].name]: ''
      });
      setErrorState(res.response.data.detail)
      setTimeout(() => {
        setErrorState(null)
      }, 5000);
    }
  }

  return(
    <LoginForm
      state={loginState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title="Inicia sesión"
      subtitle="¿No tienes una cuenta?"
      link="Regístrate ahora"
      linkUrl="/register"
      fields={loginFields}
      buttonLabel="Inicia sesión"
      error={errorState}
    />
  );
}

export default Login;
