import fs from "fs";
import path from "path";

export type AdminUserRecord = {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  role: "user" | "admin";
  createdAt: string;
  password?: string;
};

const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "admin-users.json");

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const defaultUsers: AdminUserRecord[] = [
  {
    id: "admin-1",
    fullName: "Admin User",
    email: "admin@gmail.com",
    contactNumber: "9800000000",
    gender: "Admin",
    role: "admin",
    createdAt: new Date().toISOString(),
    password: "admin123",
  },
  {
    id: "user-1",
    fullName: "Jane Doe",
    email: "jane@example.com",
    contactNumber: "9812345678",
    gender: "Female",
    role: "user",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    password: "123456",
  },
];

let users: AdminUserRecord[] = loadUsers();

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

function loadUsers(): AdminUserRecord[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } else {
      ensureStorageDir();
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(defaultUsers, null, 2), "utf-8");
      return [...defaultUsers];
    }
  } catch (error) {
    console.warn("Failed to load admin users from storage:", error);
  }

  return defaultUsers;
}

function saveUsers() {
  try {
    ensureStorageDir();
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.warn("Failed to save admin users to storage:", error);
  }
}

const ensureSeed = () => {
  if (users.length === 0) {
    users = [...defaultUsers];
    saveUsers();
  }
};

export const getAdminUsers = () => {
  ensureSeed();
  return [...users];
};

export const findAdminUserById = (id: string) => {
  ensureSeed();
  return users.find((user) => user.id === id) || null;
};

export const findAdminUserByEmail = (email: string) => {
  ensureSeed();
  return (
    users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
  );
};

export const findAdminUserByCredentials = (
  email: string,
  password: string
) => {
  ensureSeed();
  return (
    users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    ) || null
  );
};

export const createAdminUser = (payload: Partial<AdminUserRecord>) => {
  ensureSeed();
  const createdUser: AdminUserRecord = {
    id: payload.id || createId(),
    fullName: payload.fullName?.trim() || "New User",
    email: payload.email?.trim().toLowerCase() || "",
    contactNumber: payload.contactNumber?.trim() || "",
    gender: payload.gender?.trim() || "",
    role: payload.role === "admin" ? "admin" : "user",
    createdAt: payload.createdAt || new Date().toISOString(),
    password: payload.password || "123456",
  };

  users = [createdUser, ...users];
  saveUsers();
  return createdUser;
};

export const updateAdminUser = (
  id: string,
  payload: Partial<AdminUserRecord>
) => {
  ensureSeed();
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...payload,
    fullName: payload.fullName?.trim() || users[index].fullName,
    email: payload.email?.trim().toLowerCase() || users[index].email,
    contactNumber: payload.contactNumber?.trim() || users[index].contactNumber,
    gender: payload.gender?.trim() || users[index].gender,
    role: payload.role === "admin" ? "admin" : users[index].role,
  };

  saveUsers();
  return users[index];
};

export const deleteAdminUser = (id: string) => {
  ensureSeed();
  const found = users.find((user) => user.id === id);
  if (!found) {
    return null;
  }

  users = users.filter((user) => user.id !== id);
  saveUsers();
  return found;
};
