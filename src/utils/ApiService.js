import axios from "axios";
import ApiRoutes from "./ApiRoutes";



const DEMO_URL = "http://localhost:8000/api"
const LIVE_URL = "https://t-savvy-1.onrender.com/api"


// Create an Axios instance
const apiClient = axios.create({
    baseURL: DEMO_URL,
    headers: {
        // "Content-Type": "application/json",
    },
});

// Request interceptor to attach the token
apiClient.interceptors.request.use(
    (config) => {
        // Check if running on the client side

        const token = localStorage.getItem('token') // Access localStorage only on the client
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


const apiService = {

    getCurrentUser: () => apiClient.get(ApiRoutes.AUTH.CURRENT_USER),


    //SPLITS
    getUserSplits: () => apiClient.get(ApiRoutes.SPLIT.GET_USER_SPLITS),
    makeExternalSplitTransfer: (data) => apiClient.post(ApiRoutes.SPLIT.EXTERNAL_SPLIT_TRANSFER, data),
    makeInternalSplitTransfer: (data) => apiClient.post(ApiRoutes.SPLIT.INTERNAL_SPLIT_TRANSFER, data)

};



export default apiService;
