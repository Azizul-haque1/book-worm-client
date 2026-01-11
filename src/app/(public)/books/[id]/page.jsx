"use client";

import { use, useState } from "react"; // Imporitng `use` for unwrapping params in Next 15+
import { motion } from "framer-motion";
import { Star, BookOpen, Clock, Calendar, Heart, Share2, MessageSquare, User } from "lucide-react";

export default function BookDetails({ params }) {
    // Correctly unwrapping params using `use()` as per Next.js 15+ patterns
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    // Mock Data based on ID (In a real app, fetch data here)
    const book = {
        id: id,
        title: "The Midnight Library",
        author: "Matt Haig",
        rating: 4.8,
        reviewsCount: 1245,
        pages: 304,
        published: "2020",
        genre: "Fiction",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
        reviews: [
            { id: 1, user: "Sarah J.", rating: 5, comment: "Absolutely life-changing. A beautiful perspective on regrets.", date: "2 days ago" },
            { id: 2, user: "Mike T.", rating: 4, comment: "Great concept, slightly slow middle but worth the read.", date: "1 week ago" }
        ]
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumbs could go here */}

                <div className="grid md:grid-cols-[350px_1fr] gap-12 items-start">
                    {/* Left Column: Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky top-28"
                    >
                        <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl mb-6 bg-base-200">
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-3">
                            <button className="btn btn-primary flex-1">Start Reading</button>
                            <button className="btn btn-outline btn-square"><Heart className="w-5 h-5" /></button>
                            <button className="btn btn-outline btn-square"><Share2 className="w-5 h-5" /></button>
                        </div>
                    </motion.div>

                    {/* Right Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="mb-2 flex items-center gap-3">
                            <span className="badge badge-secondary badge-outline">{book.genre}</span>
                            <span className="text-sm text-base-content/60">Published {book.published}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">{book.title}</h1>
                        <p className="text-xl text-base-content/70 mb-6">by <span className="text-primary font-medium">{book.author}</span></p>

                        <div className="flex flex-wrap gap-6 mb-8 py-6 border-y border-base-200">
                            <div className="flex items-center gap-2">
                                <Star className="w-6 h-6 text-warning fill-warning" />
                                <div>
                                    <p className="font-bold text-lg">{book.rating}</p>
                                    <p className="text-xs text-base-content/60">Rating</p>
                                </div>
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-bold text-lg">{book.reviewsCount}</p>
                                    <p className="text-xs text-base-content/60">Reviews</p>
                                </div>
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-secondary" />
                                <div>
                                    <p className="font-bold text-lg">{book.pages}</p>
                                    <p className="text-xs text-base-content/60">Pages</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                {book.synopsis}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Community Reviews</h3>
                            <div className="space-y-6">
                                {book.reviews.map((review) => (
                                    <div key={review.id} className="bg-base-200/50 p-6 rounded-2xl">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">{review.user}</p>
                                                    <p className="text-xs text-base-content/50">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? "fill-warning text-warning" : "text-base-300"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-base-content/80 text-sm pl-13">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
