"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  ArrowLeft, Search, Eye, Pencil, Trash2, X, Save,
  ShieldCheck, Plus, RefreshCw,
} from "lucide-react";
import {
  handleAdminGetUsers, handleAdminUpdateUser,
  handleAdminDeleteUser, handleAdminCreateUser,
} from "@/lib/actions/booking-action";

type AdminUser = {
  _id: string;
  fullName: string;
  email: string;
  contactNumber?: string;
  gender?: string;
  role: "user" | "admin";
  createdAt: string;
};

type Meta = { page: number; limit: number; total: number; totalPages: number };

const EMPTY_FORM = { fullName: "", email: "", contactNumber: "", gender: "male", role: "user" as const, password: "" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [viewUser, setViewUser] = useState<AdminUser | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadUsers = (pg = page, q = search) => {
    setLoading(true);
    setApiError("");
    handleAdminGetUsers({ page: pg, limit: 10, search: q }).then((result) => {
      if (result.success) {
        setUsers(result.data as AdminUser[]);
        setMeta(result.meta as Meta);
      } else {
        setApiError(result.message || "Failed to load users");
      }
      setLoading(false);
    });
  };

  useEffect(() => { loadUsers(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadUsers(1, search);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    startTransition(async () => {
      const result = await handleAdminDeleteUser(id);
      if (result.success) {
        loadUsers();
      } else {
        setApiError(result.message || "Delete failed");
      }
    });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    startTransition(async () => {
      const { _id, createdAt, ...rest } = editingUser;
      const result = await handleAdminUpdateUser(_id, rest);
      if (result.success) {
        setEditingUser(null);
        loadUsers();
      } else {
        setFormError(result.message || "Update failed");
      }
    });
  };

  const handleCreate = () => {
    setFormError("");
    if (!createForm.fullName || !createForm.email || !createForm.password) {
      setFormError("Full name, email, and password are required");
      return;
    }
    startTransition(async () => {
      const result = await handleAdminCreateUser(createForm);
      if (result.success) {
        setShowCreate(false);
        setCreateForm(EMPTY_FORM);
        loadUsers();
      } else {
        setFormError(result.message || "Create failed");
      }
    });
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#071b38] text-[#111827]">
      <main className="px-6 md:px-10 py-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 mb-5">
          <ArrowLeft size={18} />Back to Dashboard
        </Link>

        <section className="rounded-3xl bg-gradient-to-r from-[#0d2447] via-[#10294f] to-[#071b38] text-white px-7 py-8 shadow-xl mb-7 border border-[#19375f]">
          <div className="flex items-center gap-2 text-xs uppercase text-orange-100 mb-3">
            <ShieldCheck size={15} className="text-orange-400" />System Administrator Portal
          </div>
          <h2 className="text-3xl font-extrabold mb-3">User Management</h2>
          <p className="text-sm text-blue-100 max-w-xl leading-6">
            Monitor system activity, manage user accounts, roles, and permissions.
          </p>
          {meta && (
            <div className="mt-4 flex gap-6 text-sm">
              <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl font-bold text-orange-400">{meta.total}</p>
                <p className="text-xs text-gray-300">Total Users</p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#071b38]">User Accounts</h2>
              <p className="text-xs text-gray-500 mt-1">Live data from the API</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => loadUsers()} className="flex items-center gap-2 bg-[#0d2447] text-white px-4 py-3 rounded-2xl text-sm font-bold hover:bg-[#10294f]">
                <RefreshCw size={15} />Refresh
              </button>
              <button onClick={() => { setShowCreate(true); setFormError(""); }} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl text-sm font-bold">
                <Plus size={16} />Add User
              </button>
            </div>
          </div>

          {apiError && <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm">{apiError}</div>}

          <form onSubmit={handleSearch} className="relative w-full md:w-[360px] mb-6">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500" />
          </form>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
              <RefreshCw size={22} className="animate-spin" />Loading users...
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-[#0d2447] text-orange-100 text-xs uppercase">
                    <tr>
                      <th className="text-left px-5 py-4">User</th>
                      <th className="text-left px-5 py-4">Email</th>
                      <th className="text-left px-5 py-4">Role</th>
                      <th className="text-left px-5 py-4">Contact</th>
                      <th className="text-left px-5 py-4">Joined</th>
                      <th className="text-center px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t border-gray-100 hover:bg-orange-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                              {getInitials(u.fullName)}
                            </div>
                            <div>
                              <p className="font-bold text-[#071b38]">{u.fullName}</p>
                              <p className="text-xs text-gray-400">{u.gender || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-700">{u.email}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${u.role === "admin" ? "bg-orange-100 text-orange-600 border border-orange-300" : "bg-blue-100 text-[#0d2447] border border-blue-200"}`}>
                            {u.role === "admin" ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-700">{u.contactNumber || "—"}</td>
                        <td className="px-5 py-4 text-gray-700">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-4 text-gray-500">
                            <button onClick={() => setViewUser(u)} className="hover:text-orange-500" title="View"><Eye size={16} /></button>
                            <button onClick={() => { setEditingUser(u); setFormError(""); }} className="hover:text-orange-500" title="Edit"><Pencil size={16} /></button>
                            <button onClick={() => handleDelete(u._id)} className="hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-500">No users found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between mt-5 text-sm">
                  <p className="text-gray-500">Page {meta.page} of {meta.totalPages} · {meta.total} users</p>
                  <div className="flex gap-2">
                    <button disabled={page <= 1} onClick={() => { const p = page - 1; setPage(p); loadUsers(p); }}
                      className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:border-orange-500">← Prev</button>
                    <button disabled={page >= meta.totalPages} onClick={() => { const p = page + 1; setPage(p); loadUsers(p); }}
                      className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:border-orange-500">Next →</button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* View modal */}
      {viewUser && (
        <Modal onClose={() => setViewUser(null)} title="User Details">
          <div className="space-y-3 text-sm">
            {[["Name", viewUser.fullName], ["Email", viewUser.email], ["Phone", viewUser.contactNumber || "—"], ["Gender", viewUser.gender || "—"], ["Role", viewUser.role], ["Joined", new Date(viewUser.createdAt).toLocaleDateString()]].map(([k, v]) => (
              <p key={k}><strong>{k}:</strong> {v}</p>
            ))}
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editingUser && (
        <Modal onClose={() => setEditingUser(null)} title="Edit User">
          {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
          <div className="space-y-3">
            {["fullName", "email", "contactNumber"].map((field) => (
              <input key={field} value={(editingUser as any)[field] || ""} placeholder={field}
                onChange={(e) => setEditingUser({ ...editingUser, [field]: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm" />
            ))}
            <select value={editingUser.gender || ""} onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm">
              <option value="">Gender</option>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
            <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm">
              <option value="user">User</option><option value="admin">Admin</option>
            </select>
            <button onClick={handleSaveEdit} disabled={isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
              <Save size={18} />{isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* Create modal */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)} title="Add New User">
          {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}
          <div className="space-y-3">
            {[["fullName", "Full Name"], ["email", "Email"], ["contactNumber", "Phone"], ["password", "Password"]].map(([f, ph]) => (
              <input key={f} value={(createForm as any)[f]} placeholder={ph}
                type={f === "password" ? "password" : "text"}
                onChange={(e) => setCreateForm({ ...createForm, [f]: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm" />
            ))}
            <select value={createForm.gender} onChange={(e) => setCreateForm({ ...createForm, gender: e.target.value })}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm">
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
            <select value={createForm.role} onChange={(e) => setCreateForm({ ...createForm, role: e.target.value as any })}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-500 text-sm">
              <option value="user">User</option><option value="admin">Admin</option>
            </select>
            <button onClick={handleCreate} disabled={isPending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
              <Plus size={18} />{isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-5 z-50">
      <div className="bg-white text-gray-900 rounded-3xl p-6 w-full max-w-md shadow-xl border border-orange-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#071b38]">{title}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
