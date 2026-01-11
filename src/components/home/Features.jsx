"use client";

import { motion } from "framer-motion";
import { BookOpen, Compass, Users } from "lucide-react";

const features = [
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Track Your Reading",
        description: "Keep a digital log of every book you read. Rate, review, and organize your personal library with ease.",
        color: "bg-primary"
    },
    {
        icon: <Compass className="w-8 h-8" />,
        title: "Discover New Worlds",
        description: "Get personalized recommendations based on your reading history and favorite genres.",
        color: "bg-secondary"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Join the Community",
        description: "Connect with fellow bookworms, discuss plot twists, and share your reading challenges.",
        color: "bg-accent"
    }
];

export default function Features() {
    return (
        <section className="py-24 px-6 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-4"
                    >
                        Why BookWorm?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-base-content/70 max-w-2xl mx-auto"
                    >
                        Everything you need to enhance your reading life in one beautiful place.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-base-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${feature.color}/10 flex items-center justify-center text-${feature.color.split('-')[1]} mb-6`}>
                                <div className={`text-${feature.color.replace('bg-', '')}`}>
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
