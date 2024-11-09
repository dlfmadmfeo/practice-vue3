import axios from "axios";

const baseURL = import.meta.env.MODE === 'development'
    ? '/api'
    : `${import.meta.env.VITE_APP_SERVER_IP}/api`;

const apiRequest = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getTestResults = () => {
    return apiRequest.get(`/girlfriend/love`);
} 