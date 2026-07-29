export const API = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    WHOAMI: "/api/v1/auth/whoami",
    UPDATE: "/api/v1/auth/update",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    RESET_PASSWORD_DIRECT: "/api/v1/auth/reset-password-direct",
  },
  BOOKINGS: {
    CREATE: "/api/v1/bookings",
    LIST: "/api/v1/bookings",
    DETAIL: (id: string) => `/api/v1/bookings/${id}`,
  },
  ADMIN: {
    USERS: "/api/v1/admin/users",
    USER: (id: string) => `/api/v1/admin/users/${id}`,
  },
};
