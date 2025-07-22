import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";
import { useAuthStore } from './auth';

const { notify } = useNotification();

const baseURL = 'https://gelios-teacher.ddns.net/api/teacher';

// --- Типизация ---

export interface CertificateLanguage {
    id: string;
    name: string;
    direction: string;
}

export interface CertificateLevel {
    id: number;
    name: string;
    image: string;
}

export interface CertificateDirection {
    id: number;
    name: string;
    levels: CertificateLevel[];
}

export interface CertificateDirectionsResponse {
    [key: string]: CertificateDirection[];
}

/**
 * @interface Student
 * @description Определяет структуру объекта студента.
 */
export interface Student {
    first_name: string;
    last_name: string;
    student_id: string;
}

// --- Стор ---

export const useCertificatesStore = defineStore('certificates', {
    state: () => ({
        languages: [] as CertificateLanguage[],
        directions: null as CertificateDirectionsResponse | null,
        students: [] as Student[], // 1. Добавлено состояние для студентов
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchCertificateLanguages() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            if (!token) {
                this.error = 'Токен аутентификации не найден.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                return;
            }

            try {
                const response = await axios.get<CertificateLanguage[]>(`${baseURL}/get-language-directions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.languages = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке языков сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        async fetchCertificateDirections() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            if (!token) {
                this.error = 'Токен аутентификации не найден.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                return;
            }

            try {
                const response = await axios.get<CertificateDirectionsResponse>(`${baseURL}/get-certificate-directions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.directions = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке направлений сертификатов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },

        /**
         * @action fetchStudents
         * @description Асинхронно запрашивает и сохраняет список студентов.
         */
        async fetchStudents() { // 2. Добавлен новый action
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.token;

            if (!token) {
                this.error = 'Токен аутентификации не найден для получения студентов.';
                notify({ title: this.error, type: "error" });
                this.loading = false;
                return;
            }

            try {
                const response = await axios.get<Student[]>(`${baseURL}/get-students`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.students = response.data;
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Ошибка при загрузке студентов';
                this.error = errorMessage;
                notify({ title: errorMessage, type: "error" });
            } finally {
                this.loading = false;
            }
        },
    },

    getters: {
        isLoading: (state) => state.loading,
        getLanguages: (state) => state.languages,
        getDirections: (state) => state.directions,
        getStudents: (state) => state.students, // 3. Добавлен новый getter
    },
});