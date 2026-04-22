import axios from "axios";

const subscription = axios.create({
    baseURL: "http://localhost:8000/subscription/",
    withCredentials: true,
});

const refreshSubsctiption = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
});

subscription.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;

        if(!request) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !request._retry) {
            request._retry = true;
            console.log('request', request);

            try {
                console.log('CALL REFRESH');
                await refreshSubsctiption.post("/auth/token/refresh/");
                console.log('token refreshed');
                return api(request);
            } catch {
                console.log('token refresh failed');
                return Promise.reject(error);
            }
        }
        console.log('Error != 401', error.response);
        return Promise.reject(error);
    }
);

export default subscription