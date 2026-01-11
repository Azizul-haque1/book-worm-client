"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star } from "lucide-react";
import Link from "next/link";

const allBooks = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        rating: 4.8,
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        genre: "Fiction",
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        rating: 4.9,
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
        genre: "Self-Help",
    },
    {
        id: 3,
        title: "Project Hail Mary",
        author: "Andy Weir",
        rating: 4.9,
        cover: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400",
        genre: "Sci-Fi",
    },
    {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        rating: 4.7,
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400",
        genre: "Sci-Fi",
    },
    {
        id: 5,
        title: "Educated",
        author: "Tara Westover",
        rating: 4.8,
        cover: "https://images.unsplash.com/photo-1571167530472-83b38031d60b?auto=format&fit=crop&q=80&w=400",
        genre: "Memoir",
    },
    {
        id: 6,
        title: "1984",
        author: "George Orwell",
        rating: 4.6,
        cover: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?auto=format&fit=crop&q=80&w=400",
        genre: "Fiction",
    },
    {
        id: 7,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        rating: 4.7,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
        genre: "History",
    },
];

const categories = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "History", "Self-Help"];

export default function Books() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = allBooks.filter((book) => {
        const matchesCategory = activeCategory === "All" || book.genre === activeCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Browse Library</h1>
                        <p className="text-base-content/70">Discover your next favorite read from our curated collection.</p>
                    </div>

                    <div className="join w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="input input-bordered join-item pl-10 w-full md:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary join-item">Search</button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`btn btn-sm rounded-full ${activeCategory === category ? "btn-neutral" : "btn-ghost border-base-300"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Book Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
                    {filteredBooks.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                        >
                            <Link href={`/books/${book.id}`}>
                                <div className="aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 bg-base-200 relative">
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                        <Star className="w-3 h-3 text-warning fill-warning" />
                                        {book.rating}
                                    </div>
                                </div>
                                <h3 className="font-bold leading-tight mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
                                <p className="text-sm text-base-content/60">{book.author}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
