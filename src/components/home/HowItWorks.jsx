"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, BarChart3 } from "lucide-react";

const steps = [
    {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Sign Up",
        description: "Create your free account in seconds. It's quick, easy, and gets you started on your reading journey instantly.",
        color: "bg-primary"
    },
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Add Your Books",
        description: "Search our massive database to add books you're reading, want to read, or have finished.",
        color: "bg-secondary"
    },
    {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "Track Progress",
        description: "Update your reading progress, set yearly goals, and visualize your reading habits with beautiful charts.",
        color: "bg-accent"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-4"
                    >
                        How BookWorm Works
                    </motion.h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Your personal reading tracking companion in three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-base-300 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="text-center relative bg-base-100 p-6 md:bg-transparent"
                        >
                            <div className={`w-24 h-24 mx-auto rounded-full ${step.color}/10 flex items-center justify-center mb-6 relative z-10 bg-base-100 shadow-sm border-4 border-base-100`}>
                                <div className={`text-${step.color.replace('bg-', '')} ${step.color.replace('bg-', 'text-')}`}>
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-base-content/70 max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
