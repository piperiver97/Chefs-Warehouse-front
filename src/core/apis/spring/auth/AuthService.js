import AuthRepository from './AuthRepository'

export default class AuthService {
    constructor(credentials) {
        this.repository = new AuthRepository();
        this.credentials = credentials;
    }

    async login() {
        try {
            return await this.repository.login(this.credentials);
        } catch (error) {
            console.error('Service Error:', error);
            throw error;
        }
    }
}