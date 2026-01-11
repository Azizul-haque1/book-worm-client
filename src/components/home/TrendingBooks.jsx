"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const books = [
    {
        title: "The Midnight Library",
        author: "Matt Haig",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
        tag: "Fiction"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        tag: "Self-Help"
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800",
        tag: "Sci-Fi"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
        tag: "Classic"
    }
];

export default function TrendingBooks() {
    return (
        <section className="py-24 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold mb-2"
                        >
                            Trending This Week
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-base-content/70"
                        >
                            Top rated books by our community members
                        </motion.p>
                    </div>
                    <Link href="/books" className="btn btn-ghost hover:bg-base-200 gap-2 group">
                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books.map((book, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-200 relative">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md">
                                    {book.tag}
                                </div>
                            </div>

                            <h3 className="font-bold text-lg truncate">{book.title}</h3>
                            <p className="text-sm text-base-content/60 mb-2">{book.author}</p>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warning fill-warning" />
                                <span className="text-sm font-medium">{book.rating}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
