"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, BookOpen, Clock, Calendar, Heart, Share2, MessageSquare, User, BookmarkPlus, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function BookDetails({ params }) {
    // Unwrap params using `use()` as per Next.js 15+ patterns
    const unwrappedParams = use(params);
    const { user } = useAuth();
    const userId = user?._id;
    const id = unwrappedParams.id;
    const router = useRouter();

    // State management
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingShelf, setUpdatingShelf] = useState(null); // Track which shelf is being updated
    const [bookStatus, setBookStatus] = useState(null); // Track current shelf status: null, wantToRead, currentlyReading, read

    // Fetch book details from API
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
                    credentials: "include",
                });
                const responseData = await res.json();

                if (!res.ok) {
                    throw new Error(responseData?.message || "Failed to fetch book details");
                }

                // Handle different response structures
                const bookData = responseData.book || responseData.data || responseData;
                setBook(bookData);
            } catch (error) {
                console.error("Fetch Book Error:", error);
                toast.error(error.message || "Failed to load book details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    // Fetch book's current shelf status
    useEffect(() => {
        const fetchBookStatus = async () => {
            if (!user) {
                setBookStatus(null);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/my-books`, {
                    credentials: "include",
                });

                if (!res.ok) return;

                const data = await res.json();

                // Check which shelf the book is on
                if (data.currentlyReading?.some(b => b?._id === id)) {
                    setBookStatus("currentlyReading");
                } else if (data.wantToRead?.some(b => b?._id === id)) {
                    setBookStatus("wantToRead");
                } else if (data.read?.some(b => b?._id === id)) {
                    setBookStatus("read");
                } else {
                    setBookStatus(null);
                }
            } catch (error) {
                console.error("Fetch Book Status Error:", error);
            }
        };

        fetchBookStatus();
    }, [user, id]);

    // Handle shelf update (Want to Read, Start Reading, Mark as Completed)
    const updateShelf = async (shelf) => {
        // Check if user is logged in
        if (!user) {
            toast.error("Please login to update your shelf");
            router.push("/login");
            return;
        }


        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/shelf`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    bookId: id,
                    status: shelf,
                }),
            });

            const responseData = await res.json();

            console.log('re', responseData);
            setUpdatingShelf(shelf);

            if (!res.ok) {
                throw new Error(responseData?.message || "Failed to update shelf");
            }

            // Success messages based on shelf type
            const messages = {
                wantToRead: "Added to your Want to Read list! 📚",
                currentlyReading: "Started reading! Happy reading 📖",
                read: "Marked as completed! Great job 🎉",
            };

            toast.success(messages[shelf] || "Shelf updated successfully!");

            // Update local book status
            setBookStatus(shelf);
        } catch (error) {
            console.error("Update Shelf Error:", error);
            toast.error(error.message || "Failed to update shelf");
        } finally {
            setUpdatingShelf(null);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
                <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-4 text-base-content/60">Loading book details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state (book not found)
    if (!book) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
                <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
                        <p className="text-base-content/60 mb-6">The book you're looking for doesn't exist.</p>
                        <button onClick={() => router.push('/books')} className="btn btn-primary">
                            Browse Books
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                        <div className="flex flex-col gap-3">
                            {/* Shelf Action Buttons - Conditional based on current status */}
                            <div className="flex flex-wrap gap-2">
                                {/* Want to Read - Show only if book is not in any shelf */}
                                {bookStatus === null && (
                                    <button
                                        onClick={() => updateShelf("wantToRead")}
                                        disabled={updatingShelf !== null}
                                        className="btn btn-outline btn-secondary flex-1"
                                    >
                                        {updatingShelf === "wantToRead" ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <BookmarkPlus className="w-4 h-4" />
                                                Want to Read
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Start Reading - Show if book is not started or in wantToRead */}
                                {(bookStatus === null || bookStatus === "wantToRead") && (
                                    <button
                                        onClick={() => updateShelf("currentlyReading")}
                                        disabled={updatingShelf !== null}
                                        className="btn btn-primary flex-1"
                                    >
                                        {updatingShelf === "currentlyReading" ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Starting...
                                            </>
                                        ) : (
                                            <>
                                                <BookOpen className="w-4 h-4" />
                                                Start Reading
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Mark as Completed - Show if currently reading */}
                                {bookStatus === "currentlyReading" && (
                                    <button
                                        onClick={() => updateShelf("read")}
                                        disabled={updatingShelf !== null}
                                        className="btn btn-success flex-1"
                                    >
                                        {updatingShelf === "read" ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Marking...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Mark as Completed
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Already Completed Badge */}
                                {bookStatus === "read" && (
                                    <div className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-success/10 text-success rounded-lg border border-success/20">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-semibold">Completed</span>
                                    </div>
                                )}
                            </div>

                            {/* Current Status Indicator */}
                            {bookStatus && bookStatus !== "read" && (
                                <div className="text-sm text-base-content/60 text-center">
                                    {bookStatus === "wantToRead" && "📚 In your Want to Read list"}
                                    {bookStatus === "currentlyReading" && "📖 Currently reading"}
                                </div>
                            )}

                            {/* Share & Like Buttons */}
                            <div className="flex gap-2">
                                <button className="btn btn-outline btn-square"><Heart className="w-5 h-5" /></button>
                                <button className="btn btn-outline btn-square"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="mb-2 flex items-center gap-3">
                            <span className="badge badge-secondary badge-outline">{book.genre || "General"}</span>
                            {book.published && <span className="text-sm text-base-content/60">Published {book.published}</span>}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">{book.title}</h1>
                        <p className="text-xl text-base-content/70 mb-6">by <span className="text-primary font-medium">{book.author}</span></p>

                        <div className="flex flex-wrap gap-6 mb-8 py-6 border-y border-base-200">
                            {book.rating && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-6 h-6 text-warning fill-warning" />
                                        <div>
                                            <p className="font-bold text-lg">{book.rating}</p>
                                            <p className="text-xs text-base-content/60">Rating</p>
                                        </div>
                                    </div>
                                    <div className="divider divider-horizontal"></div>
                                </>
                            )}
                            {book.reviewsCount && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                        <div>
                                            <p className="font-bold text-lg">{book.reviewsCount}</p>
                                            <p className="text-xs text-base-content/60">Reviews</p>
                                        </div>
                                    </div>
                                    <div className="divider divider-horizontal"></div>
                                </>
                            )}
                            {book.pages && (
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-secondary" />
                                    <div>
                                        <p className="font-bold text-lg">{book.pages}</p>
                                        <p className="text-xs text-base-content/60">Pages</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-bold mb-4">Synopsis</h3>
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                {book.description || book.synopsis || "No description available."}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        {book.reviews && book.reviews.length > 0 && (
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
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
