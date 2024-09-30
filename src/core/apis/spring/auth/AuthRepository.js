import axios from "axios"

export default class AuthRepository {

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT_CHEFWAREHOUSE
    }

    async login(credentials) {
        try {
            const response = await axios.get(this.baseUrl + '/login', {
                auth: {
                    "username": credentials.getUsername(),
                    "password": credentials.getPassword()
                },
                withCredentials: true
            })

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }
}