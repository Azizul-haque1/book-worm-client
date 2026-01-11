"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Book Blogger",
        content: "BookWorm has completely transformed how I track my reading. The community features are amazing!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Marcus Johnson",
        role: "Avid Reader",
        content: "Finally, a tracking app that looks beautiful and feels intuitive. I love the stats breakdown.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Emma Davis",
        role: "Librarian",
        content: "I recommend this to all my patrons. It's the perfect tool for discovering your next favorite book.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-base-200 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-4"
                    >
                        Loved by Readers
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300 relative"
                        >
                            <Quote className="absolute top-6 right-8 text-primary/20 w-12 h-12" />
                            <p className="text-lg text-base-content/80 mb-6 italic leading-relaxed">"{item.content}"</p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-base-content">{item.name}</h4>
                                    <p className="text-sm text-base-content/60">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
