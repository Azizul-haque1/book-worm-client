"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Cta() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                >
                    Ready to start your reading journey?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl opacity-90 mb-10 max-w-2xl mx-auto"
                >
                    Join thousands of readers who are tracking their books, discovering new favorites, and connecting with a global community.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/register" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-8 shadow-xl">
                        Create Free Account
                    </Link>
                    <Link href="/login" className="btn btn-lg btn-outline text-white hover:bg-white/10 hover:border-white rounded-full px-8">
                        Log In
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
