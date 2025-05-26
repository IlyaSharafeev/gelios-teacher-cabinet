import { defineStore } from 'pinia';
import axios from 'axios';
import * as process from "node:process";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
    }),

    actions: {
        async register({ email, username, contactNumber, password }) {
            try {
                const response = await axios.post('/api/teacher', {
                    email,
                    username,
                    contactNumber,
                    password,
                });
                this.token = response.data.token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', this.token);
                this.error = null;
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка регистрации';
                return { success: false, error: this.error };
            }
        },

        async login({ email, password }) {
            try {
                const response = await axios.post(`${baseURL}/api/auth/sign-in`, {
                    email,
                    password,
                });
                console.log(response);
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', this.token);
                this.error = null;
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка входа';
                return { success: false, error: this.error };
            }
        },

        async recoverPassword(password) {
            const token = this.token;
            try {
                await axios.post(`${baseURL}/api/auth/reset-password`, { teacher: {token, password} });
                this.error = null;
                return { success: true };
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка восстановления пароля';
                return { success: false, error: this.error };
            }
        },

        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },

        initializeAuth() {
            if (this.token) {
                this.isAuthenticated = true;
                // Можно добавить запрос для проверки токена и получения данных пользователя
            }
        },
    },

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        currentUser: (state) => state.user,
        authError: (state) => state.error,
    },
});