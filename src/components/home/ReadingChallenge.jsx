"use client";

import { motion } from "framer-motion";
import { Trophy, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReadingChallenge() {
    return (
        <section className="py-24 px-6 bg-base-100">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Trophy className="w-64 h-64 rotate-12" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="flex-1 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6"
                            >
                                <Target className="w-4 h-4" />
                                2025 Reading Challenge
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                            >
                                Challenge yourself to read <br />
                                <span className="text-primary">50 books</span> this year
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-base-content/70 mb-8 max-w-xl"
                            >
                                Set your goal, track your progress, and earn badges along the way. Join over 10,000 readers participating in this year's challenge.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link href="/register" className="btn btn-primary btn-lg rounded-full shadow-lg shadow-primary/30">
                                    Join the Challenge
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Interactive Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-sm border border-base-200"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-bold text-lg">My Goal</h4>
                                    <p className="text-sm text-base-content/60">2025 Challenge</p>
                                </div>
                                <div className="radial-progress text-primary font-bold text-sm" style={{ "--value": 65, "--size": "3rem" }}>
                                    65%
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Progress</span>
                                        <span className="font-bold text-primary">32/50</span>
                                    </div>
                                    <div className="w-full bg-base-200 rounded-full h-3 overflow-hidden">
                                        <div className="bg-primary h-full rounded-full w-[65%]"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-base-content/50 text-center pt-2">
                                    18 books to go! You're ahead of schedule.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
