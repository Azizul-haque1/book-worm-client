"use client";

import { Edit, Trash2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminBooks() {
    const [books, setBooks] = useState([]); // Start with empty array
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    // Updated initial state to match new requirements
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        cover: "",
        genre: "",
        status: "published",
    });
    const fetchBooks = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                credentials: "include",
            });

            // Parse response
            let responseData;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                responseData = await res.json();
            } else {
                const text = await res.text();
                console.error("Non-JSON response:", text);
                throw new Error("Invalid response format from server");
            }

            if (!res.ok) {
                const errorMessage = responseData?.message || responseData?.error || "Failed to fetch books";
                throw new Error(errorMessage);
            }

            // Handle different response structures
            // Some APIs return { books: [...] }, others return the array directly
            const booksData = responseData.books || responseData.data || responseData;

            // Ensure we have an array
            if (Array.isArray(booksData)) {
                setBooks(booksData);
            } else {
                console.error("Invalid books data structure:", booksData);
                setBooks([]);
                toast.error("Invalid data format received from server");
            }
        } catch (error) {
            console.error("Fetch Books Error:", error);
            const errorMessage = error.message || "Error loading books";
            toast.error(errorMessage);
            setBooks([]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddNew = () => {
        setEditingBook(null);
        setFormData({
            title: "",
            author: "",
            description: "",
            cover: "",
            genre: "",
            status: "published",
        });
        setIsModalOpen(true);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            description: book.description || "",
            cover: book.cover || "",
            genre: book.genre || "",
            status: book.status || "published",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            // Parse response if there is one
            let responseData;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                try {
                    responseData = await res.json();
                } catch (e) {
                    // Some DELETE endpoints return empty response
                    responseData = null;
                }
            }

            if (!res.ok) {
                const errorMessage = responseData?.message || responseData?.error || "Failed to delete book";
                throw new Error(errorMessage);
            }

            // Remove from local state
            setBooks(books.filter((book) => (book._id || book.id) !== id));
            toast.success("Book deleted successfully");
        } catch (error) {
            console.error("Delete Error:", error);
            const errorMessage = error.message || "Failed to delete book";
            toast.error(errorMessage);
        }
    };

    // Validate form data
    const validateFormData = () => {
        if (!formData.title?.trim()) {
            toast.error("Book title is required");
            return false;
        }
        if (!formData.author?.trim()) {
            toast.error("Author name is required");
            return false;
        }
        if (!formData.genre?.trim()) {
            toast.error("Genre is required");
            return false;
        }
        if (!formData.cover?.trim()) {
            toast.error("Cover image URL is required");
            return false;
        }
        if (!formData.description?.trim()) {
            toast.error("Description is required");
            return false;
        }
        return true;
    };

    // Reset form and close modal
    const resetForm = () => {
        setFormData({
            title: "",
            author: "",
            description: "",
            cover: "",
            genre: "",
            status: "published",
        });
        setIsModalOpen(false);
        setEditingBook(null);
    };

    // Add new book
    const handleAddBook = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const responseData = await res.json();
            console.log('formdata', formData);

            if (!res.ok) {
                throw new Error(responseData?.message || "Failed to create book");
            }

            // Get the new book from response
            const newBook = responseData.book || responseData.data || responseData;

            // Add to books list
            setBooks([...books, { ...newBook, _id: newBook._id || newBook.id }]);

            toast.success("Book created successfully");
            resetForm();
        } catch (error) {
            console.error("Add Book Error:", error);
            toast.error(error.message || "Failed to create book");
        }
    };

    // Update existing book
    const handleUpdateBook = async () => {
        try {
            const id = editingBook._id || editingBook.id;


            console.log('form data', formData);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData?.message || "Failed to update book");
            }

            // Get the updated book from response
            const updatedBook = responseData.book || responseData.data || responseData;

            // Update books list
            setBooks(books.map((book) => {
                const bookId = book._id || book.id;
                return bookId === id ? { ...book, ...updatedBook, _id: bookId } : book;
            }));

            toast.success("Book updated successfully");
            resetForm();
        } catch (error) {
            console.error("Update Book Error:", error);
            toast.error(error.message || "Failed to update book");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateFormData()) {
            return;
        }

        // Call appropriate function
        if (editingBook) {
            await handleUpdateBook();
        } else {
            await handleAddBook();
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading books...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Books</h1>
                <button
                    onClick={handleAddNew}
                    className="btn btn-primary gap-2"
                >
                    <Plus size={18} />
                    Add New Book
                </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-sm border border-base-200">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200/50">
                        <tr>
                            <th>Book Info</th>
                            <th>Genre</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-base-content/60">
                                    No books found. Add one to get started.
                                </td>
                            </tr>
                        ) : (
                            books.map((book) => (
                                <tr key={book._id || book.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            {book.cover && (
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image height={36} width={36} src={book.cover} alt={book.title} />
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-base">{book.title}</div>
                                                <div className="text-sm opacity-50">{book.author}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-base-content/80">{book.genre}</td>
                                    <td>
                                        <div className={`badge ${book.status === 'published' ? 'badge-success badge-outline' : 'badge-warning badge-outline'}`}>
                                            {book.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(book)}
                                                className="btn btn-ghost btn-square btn-sm text-primary hover:bg-primary/10"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book._id || book.id)}
                                                className="btn btn-ghost btn-square btn-sm text-error hover:bg-error/10"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-lg border border-base-200 p-6 animate-in fade-in zoom-in duration-200 my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">
                                {editingBook ? 'Edit Book' : 'Add New Book'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-ghost btn-sm btn-square"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Book Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter book title"
                                        className="input input-bordered w-full focus:input-primary transition-all"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Author</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Author name"
                                        className="input input-bordered w-full focus:input-primary transition-all"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Genre</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Fiction"
                                        className="input input-bordered w-full focus:input-primary transition-all"
                                        value={formData.genre}
                                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Cover Image URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        className="input input-bordered w-full focus:input-primary transition-all"
                                        value={formData.cover}
                                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Description</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter book description..."
                                        className="textarea textarea-bordered w-full h-24 focus:textarea-primary transition-all"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text font-medium">Status</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full focus:select-primary transition-all"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div className="modal-action mt-8">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary px-8">
                                    {editingBook ? 'Update Book' : 'Add Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
