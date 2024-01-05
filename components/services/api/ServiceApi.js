import axios from 'axios'
import {parseJwt} from '../Helpers'
import {config} from "@/components/Constants";
import {apiInstance} from "@/components/services/api/AxiosInstance";

export const serviceApi = {
    authenticate,
    signup,
    logout,
    scrappingFromUrl
}

function scrappingFromUrl(url) {
    return apiInstance.get('/public/scrappingFromUrl', {
        params: {url}
    },)
}

function authenticate(username, password) {
    return apiInstance.post('/auth/authenticate', {username, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return apiInstance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}

function logout(user) {
    return apiInstance.get('/logout', {
        headers: {'Authorization': bearerAuth(user)}
    });
}



function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return apiInstance.get(url, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

function deleteUser(user, username) {
    return apiInstance.delete(`/api/users/${username}`, {
        headers: {'Authorization': bearerAuth(user)}
    })
}

// -- Axios


// -- Helper functions

function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}