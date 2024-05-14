import axios from "axios";
import { API_URL_TOKEN_REFRESH } from "../constants/constants";

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const response = await axios.post(API_URL_TOKEN_REFRESH,
            {
                refresh:localStorage.getItem('refresh_token')
            },
            {
                headers:{'Content-Type': 'application/json'}
            },
            {withCredentials: true}
        );
        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});
