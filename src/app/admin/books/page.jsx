"use client";

import { Edit, Trash2, Plus } from "lucide-react";

const books = [
    { id: 1, title: "The Midnight Library", author: "Matt Haig", status: "Published", price: "$24.99" },
    { id: 2, title: "Atomic Habits", author: "James Clear", status: "Published", price: "$19.99" },
    { id: 3, title: "Project Hail Mary", author: "Andy Weir", status: "Draft", price: "$26.99" },
    { id: 4, title: "Dune", author: "Frank Herbert", status: "Published", price: "$29.99" },
];

export default function AdminBooks() {
    return (
        <div>
            <div className="flex justify-between items-center  mt-10">
                <h1 className="text-3xl font-bold">Manage Books</h1>
                <button className="btn btn-primary gap-2">
                    <Plus size={18} />
                    Add New Book
                </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200/50">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <th>#{book.id}</th>
                                <td>
                                    <div className="font-bold">{book.title}</div>
                                </td>
                                <td>{book.author}</td>
                                <td>
                                    <div className={`badge ${book.status === 'Published' ? 'badge-success badge-outline' : 'badge-warning badge-outline'}`}>
                                        {book.status}
                                    </div>
                                </td>
                                <td>{book.price}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-ghost btn-xs text-primary"><Edit size={16} /></button>
                                        <button className="btn btn-ghost btn-xs text-error"><Trash2 size={16} /></button>
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
