
import {config} from "@/components/Constants";
import {parseJwt} from "@/components/services/Helpers";
import axios, {AxiosInstance} from "axios";

export const apiInstance: AxiosInstance = axios.create({
    baseURL: config.url.API_BASE_URL
});

apiInstance.interceptors.request.use(function (config : any) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error: any) {
    return Promise.reject(error)
});

export function bearerAuth() {
    let user: any;
    // @ts-ignore
    user = JSON.parse(localStorage.getItem('user'));
    return `Bearer ${user.accessToken}`
}

export function bearerAuthWithUser(user: any) {
    // @ts-ignore
    return `Bearer ${user.accessToken}`
}