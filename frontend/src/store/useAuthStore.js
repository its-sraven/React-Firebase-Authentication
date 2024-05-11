import { create } from 'zustand'
import axios from 'axios';

const useAuthStore = create((set) => ({
    currentUser: null,
    isAuthenticated: false,
    accessToken: null,

    // Method to set access token
    setAccessToken: (token) => set({ accessToken: token }),

    setLogin: (user, token) => {
        // Set the current user and authentication status
        set({ currentUser: user, isAuthenticated: true });

        // Set the access token
        set({ accessToken: token });

        // Set Axios default headers with access token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setLogout: () => {
        // Clear the current user, authentication status, and access token
        set({ currentUser: null, isAuthenticated: false, accessToken: null });

        // Remove access token from Axios default headers
        delete axios.defaults.headers.common['Authorization'];
    },

    // Function to make authenticated API requests
    api: async (config) => {
        try {
            // Make sure there is an access token
            if (!useAuthStore.getState().accessToken) {
                throw new Error('No access token found');
            }

            // Make the API request with Axios
            const response = await axios({
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            // Handle errors
            console.error('API request error:', error);
            throw error;
        }
    },
}));

export default useAuthStore;