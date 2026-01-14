"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2, UserCog } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:4000/users", {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error("Error loading users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`http://localhost:4000/users/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to delete user");

            toast.success("User deleted successfully");
            setUsers(users.filter(u => u._id !== userId));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === "admin" ? "user" : "admin";

        try {
            const res = await fetch(`http://localhost:4000/users/${userId}/role`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to update role");

            toast.success(`Role updated to ${newRole}`);
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading users...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>

            <div className="shadow-sm border border-base-200 rounded-2xl overflow-x-auto bg-base-100">
                <table className="table w-full">
                    <thead className="bg-base-200/50">
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-xs">{user.name?.charAt(0) || "U"}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="badge badge-primary badge-sm">Admin</span>
                                    ) : (
                                        <span className="badge badge-ghost badge-sm">User</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex items-center gap-2 text-success text-sm font-medium">
                                        <CheckCircle size={14} /> Active
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-ghost btn-xs text-primary gap-1"
                                            onClick={() => handleRoleChange(user._id, user.role)}
                                            title="Change Role"
                                        >
                                            <UserCog size={16} />
                                            <span className="hidden md:inline">Role</span>
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-xs text-error"
                                            onClick={() => handleDelete(user._id)}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
