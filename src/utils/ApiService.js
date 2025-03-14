import axios from "axios";
import ApiRoutes from "./ApiRoutes";



const DEMO_URL = "http://localhost:8000/api"
const LIVE_URL = "hhttps://t-savvy-1.onrender.com/api"


// Create an Axios instance
const apiClient = axios.create({
    baseURL: LIVE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach the token
apiClient.interceptors.request.use(
    (config) => {
        // Check if running on the client side

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QzNjI1Zjg2YmU4MDc3NzBlZTBmYjUiLCJpYXQiOjE3NDE5MDY1NTAsImV4cCI6MTc0MTk5Mjk1MH0.smgHz3xaDpt4ow_HxxpYrGGtZNotqjyHYz1Zk2ZWT80" // Access localStorage only on the client
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
    getUserSplits: () => apiClient.get(ApiRoutes.SPLIT.GET_USER_SPLITS)

};



export default apiService;
