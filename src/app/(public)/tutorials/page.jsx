"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const tutorials = [
    {
        id: 1,
        title: "Getting Started with BookWorm",
        duration: "3:45",
        thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
        category: "Basics"
    },
    {
        id: 2,
        title: "How to Track Your Reading Habits",
        duration: "5:12",
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
        category: "Features"
    },
    {
        id: 3,
        title: "Joining Reading Challenges",
        duration: "2:30",
        thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
        category: "Community"
    },
    {
        id: 4,
        title: "Submitting High Quality Reviews",
        duration: "4:05",
        thumbnail: "https://images.unsplash.com/photo-1457369341499-9d4b3972eb39?auto=format&fit=crop&q=80&w=400",
        category: "Advanced"
    }
];

export default function Tutorials() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Learn & Grow
                    </motion.h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Master the platform, improve your reading speed, and get the most out of your BookWorm experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-lg bg-black">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-lg mb-1 leading-tight group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                    <span className="text-sm text-base-content/60 bg-base-200 px-2 py-0.5 rounded-full">
                                        {video.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
