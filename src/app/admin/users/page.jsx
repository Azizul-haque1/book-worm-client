"use client";

import { CheckCircle, XCircle, MoreVertical } from "lucide-react";

const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", initial: "S", role: "User", status: "Active" },
    { id: 2, name: "Mike Chen", email: "mike@example.com", initial: "M", role: "Admin", status: "Active" },
    { id: 3, name: "Emma Wilson", email: "emma@example.com", initial: "E", role: "User", status: "Inactive" },
    { id: 4, name: "David Brown", email: "david@example.com", initial: "D", role: "User", status: "Active" },
];

export default function AdminUsers() {
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
                            <tr key={user.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-xs">{user.initial}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.role === 'Admin' ? (
                                        <span className="badge badge-primary badge-sm">Admin</span>
                                    ) : (
                                        <span className="badge badge-ghost badge-sm">User</span>
                                    )}
                                </td>
                                <td>
                                    {user.status === 'Active' ? (
                                        <div className="flex items-center gap-2 text-success text-sm font-medium">
                                            <CheckCircle size={14} /> Active
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-base-content/50 text-sm font-medium">
                                            <XCircle size={14} /> Inactive
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-sm btn-circle">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
