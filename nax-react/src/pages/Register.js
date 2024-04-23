import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoginForm } from "../components/LoginForm";
import { registerFields } from "../constants/formFields";
import { API_URL_REGISTER } from "../constants/constants";

let fieldsState = {};
registerFields.forEach(field => fieldsState[field.name] = '');

function Register() {
  const [registerState, setRegisterState] = useState(fieldsState);
  const [errorState, setErrorState] = useState();
  const navigate = useNavigate();

  const handleChange = event => {
    setRegisterState({...registerState, [event.target.id]: event.target.value})
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if(registerState.password === registerState.password_confirmation){
      const res = await axios.post(API_URL_REGISTER, registerState);
      if (res.status === 200) {
        navigate('/login');
      } else {
        setRegisterState({
          ...registerState,
          [registerFields[3].name]: '',
          [registerFields[4].name]: ''
        });
        setErrorState(res.response.data.message)
        setTimeout(() => {
          setErrorState(null)
        }, 5000);
      }
    } else{
      setRegisterState({
        ...registerState,
        [registerFields[3].name]: '',
        [registerFields[4].name]: ''
      });
      setErrorState("Las contraseñas no coinciden")
      setTimeout(() => {
        setErrorState(null)
      }, 5000);
    }
  }

  return(
    <LoginForm
      state={registerState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title="Crea tu cuenta en NAX"
      subtitle="¿Ya tienes una cuenta?"
      link="Inicia sesión"
      linkUrl="/login"
      fields={registerFields}
      buttonLabel="Registro"
      error={errorState}
    />
  );
}

export default Register;
