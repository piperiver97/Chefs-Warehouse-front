import axios from 'axios'

export default class AuthRepository {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT_CHEFWAREHOUSE
    }

    async login(credentials) {
        try {
            const response = await axios({
                method: 'get',
                url: `${this.baseUrl}/login`,
                auth: {
                    username: credentials.username,
                    password: credentials.password
                },
                withCredentials: true
            });
            
            return response.data;
        } catch (error) {
            console.error('Repository Error:', error.response?.data || error.message);
            throw error;
        }
    }
}