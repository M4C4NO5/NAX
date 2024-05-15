import axios from "axios";
import {API_URL_LOGOUT } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    axios.post(API_URL_LOGOUT, {
      refresh_token:localStorage.getItem('refresh_token'),
      withCredentials: true
    }).then(
      // On sucess
      (response) => {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/');
      },
      // on error
      (error) => {
        console.log('Logout no está funcionando', error)
      }
    );
  };
  return (
    <div className="cursor-pointer text-white" onClick={logout}>Cerrar sesion</div>
  )
}
