import axios from "axios";
import {API_URL_LOGOUT } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const logout = async () => {
         try {
           const {data} = await axios.post(API_URL_LOGOUT,{
                 refresh_token:localStorage.getItem('refresh_token')
                 } ,{headers: {'Content-Type': 'application/json'}},
                 {withCredentials: true});
           localStorage.clear();
           axios.defaults.headers.common['Authorization'] = null;
           navigate('/login')
           } catch (e) {
             console.log('Logout no está funcionando', e)
           }
    };
    return (
        <div onClick={logout}>Cerrar sesion</div>
    )
}