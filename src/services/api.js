import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-ddfuhyh9ehcseeeq.australiacentral-01.azurewebsites.net/api/",
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) =>
        Promise.reject(error)
);


api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            /*
             * Prevent redirect loop if the login API
             * itself returns 401.
             */
            if (
                !window.location.pathname.includes(
                    "/login"
                )
            ) {

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;