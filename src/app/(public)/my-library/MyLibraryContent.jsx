"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyLibraryContent({
    initialCurrentlyReading = [],
    initialWantToRead = [],
    initialRead = [],
    isLoggedIn = false,
}) {
    const [activeTab, setActiveTab] = useState("reading");
    const router = useRouter();

    // State for books (initialized from server props)
    const [currentlyReading] = useState(initialCurrentlyReading);
    const [wantToRead] = useState(initialWantToRead);
    const [readBooks] = useState(initialRead);

    const tabs = [
        { id: "reading", label: "Currently Reading", icon: <Book className="w-4 h-4" /> },
        { id: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
        { id: "wishlist", label: "Want to Read", icon: <Clock className="w-4 h-4" /> },
    ];

    // Get books for active tab
    const getActiveBooks = () => {
        switch (activeTab) {
            case "reading":
                return currentlyReading;
            case "completed":
                return readBooks;
            case "wishlist":
                return wantToRead;
            default:
                return [];
        }
    };

    const activeBooks = getActiveBooks();

    // Not logged in state
    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Book className="w-16 h-16 mx-auto mb-4 text-base-300" />
                    <h2 className="text-2xl font-bold mb-2">Please Login</h2>
                    <p className="text-base-content/60 mb-6">You need to be logged in to view your library.</p>
                    <button onClick={() => router.push("/login")} className="btn btn-primary">
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">My Library</h1>
                    <p className="text-base-content/70">Manage your reading progress and collection.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`btn rounded-full gap-2 ${activeTab === tab.id
                            ? "btn-primary text-white"
                            : "btn-ghost hover:bg-base-200"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeBooks.length > 0 ? (
                    activeBooks?.map((book) => (
                        <motion.div
                            key={book?._id || book?.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-base-100 rounded-2xl p-4 border border-base-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => router.push(`/books/${book._id || book.id}`)}
                        >
                            <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative group">
                                <img
                                    src={book?.cover}
                                    alt={book?.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="font-bold truncate">{book?.title}</h3>
                            <p className="text-sm text-base-content/60 mb-2">{book?.author}</p>
                            {book?.genre && (
                                <span className="badge badge-secondary badge-sm">{book.genre}</span>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center opacity-50">
                        <Book className="w-16 h-16 mx-auto mb-4 text-base-300" />
                        <p>No books in this list yet.</p>
                        <button
                            onClick={() => router.push("/books")}
                            className="btn btn-primary btn-sm mt-4"
                        >
                            Browse Books
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
