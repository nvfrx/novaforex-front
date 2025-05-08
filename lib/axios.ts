// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { NextRouter } from "next/router";

// Cria instância com baseURL e cookies
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.novaforex.io",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de resposta: tenta refresh quando recebe 401
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: InternalAxiosRequestConfig }) => {
    const originalConfig = error.config;
    // se for 401 e ainda não retry
    if (
      error.response?.status === 401 &&
      originalConfig &&
      !(originalConfig as any)._retry &&
      !originalConfig.url?.includes('/auth/refresh')
    ) {
      (originalConfig as any)._retry = true;
      try {
        // chama endpoint de refresh (que deve pegar refresh_token do cookie)
        await api.post("/auth/refresh");
        // repete a requisição original
        return api(originalConfig);
      } catch (refreshError) {
        // se falhar, limpa cookies no front (opcional) e redireciona
        if (typeof window !== "undefined") {
          // força tirar session do client se você mantiver algo em localStorage
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
