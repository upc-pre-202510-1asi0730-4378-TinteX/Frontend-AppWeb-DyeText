import axios from "axios";
import {authenticationInterceptor} from "../../iam/services/authentication.interceptor.js";


const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

/**
 * Interceptor to add authentication token to the request
 * @param config - Axios request configuration
 * @returns {AxiosRequestConfig} - Updated Axios request configuration
 */
httpInstance.interceptors.request.use(authenticationInterceptor);
export default httpInstance;