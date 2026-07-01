export type AdminUser = {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  contactNumber?: string;
  gender?: string;
  role?: "user" | "admin";
  createdAt?: string;
};

const STORAGE_KEY = "seat_sathi_users";

const defaultUsers: AdminUser[] = [
  {
    id: "admin-1",
    fullName: "Admin User",
    email: "admin@gmail.com",
    contactNumber: "9811111111",
    gender: "Admin",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

const getSavedUsers = (): AdminUser[] => {
  if (typeof window === "undefined") return defaultUsers;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}