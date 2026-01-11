"use client";

import { Check, X, Star } from "lucide-react";

const reviews = [
    { id: 1, user: "John Doe", book: "The Midnight Library", rating: 5, content: "Amazing book, truly loved it!", date: "2 mins ago" },
    { id: 2, user: "Jane Smith", book: "Atomic Habits", rating: 4, content: "Very practical advice.", date: "1 hour ago" },
    { id: 3, user: "Bob Wilson", book: "Dune", rating: 2, content: "Too slow for my taste.", date: "3 hours ago" },
];

export default function AdminReviews() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Review Moderation</h1>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="font-bold">{review.user}</div>
                                <span className="text-base-content/40">•</span>
                                <div className="text-sm text-base-content/60">on <span className="font-medium text-primary">{review.book}</span></div>
                            </div>
                            <div className="text-xs text-base-content/40">{review.date}</div>
                        </div>

                        <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < review.rating ? "fill-warning text-warning" : "text-base-300"}
                                />
                            ))}
                        </div>

                        <p className="text-base-content/80 mb-6">{review.content}</p>

                        <div className="flex gap-3">
                            <button className="btn btn-success btn-sm text-white gap-2 rounded-full px-4">
                                <Check size={14} /> Approve
                            </button>
                            <button className="btn btn-error btn-sm text-white gap-2 rounded-full px-4">
                                <X size={14} /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
