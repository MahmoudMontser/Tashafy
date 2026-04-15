// import { useAuthStore } from "@/store/auth";
import axios from "axios";
// import { useAuthStore } from "@/store/authStore";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/localization/i18n-config";

function getLocaleFromPathname(): string {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const segment = window.location.pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : DEFAULT_LOCALE;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const locale = getLocaleFromPathname();
    if (config.headers) {
      config.headers["Accept-Language"] = locale;
      config.headers["X-Locale"] = locale;
    }
    // const token = useAuthStore.getState().token; // get token from Zustand
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // useAuthStore.getState().logout(); // call store logout
    }
    return Promise.reject(error);
  },
);

export default api;
