import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import AuthService from "@/core/apis/spring/auth/AuthService";
import Credentials from "@/core/models/Credentials";

export const useAuthStore = defineStore('auth', () => {
    const user = reactive({
        username: '',
        roles: '',
        isAuthenticated: false
    });

    async function login(username, password) {
        const credentials = new Credentials(username, password);
        const service = new AuthService(credentials);
        try {
            const response = await service.login();
            if (response.message === "Logged") {
                user.username = response.username;
                user.roles = response.roles;
                user.isAuthenticated = true;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            return false;
        }
    }

    function logout() {
        user.username = '';
        user.roles = '';
        user.isAuthenticated = false;
    }

    return { user, login, logout };
});