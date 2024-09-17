import axios from "axios";

const apiRequest = axios.create({
    baseURL: `/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getTestResults = () => {
    return apiRequest.get(`/girlfriend/love`);
} 