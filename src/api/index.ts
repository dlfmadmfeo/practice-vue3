import axios from "axios";

const apiRequest = axios.create({
    baseURL: `http://43.203.215.72:8080`,
    // baseURL: `/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getTestResults = () => {
    return apiRequest.get(`test`);
} 