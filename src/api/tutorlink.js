import axios from 'axios';

const tutorlink = axios.create(
    {
        baseURL: import.meta.env.VITE_API_JAVAURL,
        timeout: 5000
    }
)

tutorlink.interceptors.request.use(config => {
    config.withCredentials = true;

    return config;
});

export default tutorlink;