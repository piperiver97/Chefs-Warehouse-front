import { defineStore } from "pinia";
import AuthService from "@/core/apis/spring/auth/AuthService";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            username: '',
            roles: '',
            isAuthenticated: false
        },
        error: null
    }),
    actions: {
        async login(username, password) {
            this.error = null;
            try {
                const credentials = { username, password };
                const service = new AuthService(credentials);
                const response = await service.login();
                
                if (response && response.message === "Logged") {
                    this.user = {
                        username: response.username,
                        roles: response.roles,
                        isAuthenticated: true
                    };
                    return true;
                } else {
                    this.error = 'Credenciales inválidas';
                    return false;
                }
            } catch (error) {
                console.error('Store: Error en login:', error);
                this.error = error.response?.data?.message || 'Error al intentar iniciar sesión';
                return false;
            }
        },
        logout() {
            this.user = {
                username: '',
                roles: '',
                isAuthenticated: false
            };
            this.error = null;
        }
    }
});