
const DEMO_URL = "http://localhost:8000/api"
const LIVE_URL = "https://t-savvy-1.onrender.com/api"

const API_BASE_URL = LIVE_URL;

const ApiRoutes = {
    // Authentication
    // AUTH: {
    //     SIGNUP: `${API_BASE_URL}/tenant`,
    //     LOGIN: `${API_BASE_URL}/tenant/login`,
    //     LOGOUT: `${API_BASE_URL}/logout`,
    //     RESET_PASSWORD: `${API_BASE_URL}/reset-password`,
    //     CURRENT_USER: `${API_BASE_URL}/current-tenant`,
    // },

    SPLIT: {
        GET_USER_SPLITS: `${API_BASE_URL}/splits`
    }
};

export default ApiRoutes;
