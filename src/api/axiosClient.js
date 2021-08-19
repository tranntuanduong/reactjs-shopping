import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://api.ezfrontend.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { config, status, data } = error.response;
        console.log(config.url, status);
        const URLS = ['/auth/local/register', '/auth/local'];
        if (URLS.includes(config.url) && status === 400) {
            const dataArray = data.data || [];
            const messagesObject = dataArray.length > 0 ? dataArray[0] : {};
            const messagesArray = messagesObject.messages || [];
            const errorString =
                messagesArray.length > 0 ? messagesArray[0].message : '';
            throw new Error(errorString);
        }
        console.log(error.response);
        return Promise.reject(error);
    }
);

export default axiosClient;
