"use client";

import { useRef } from "react";
import Link from "next/link";
import { MoveRight, BookMarked, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
    const containerRef = useRef(null);
    const bookRef = useRef(null);
    const floatRef = useRef(null);

    useGSAP(() => {
        // Complex floating animation for the hero image
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(bookRef.current, {
            y: -20,
            rotation: 5,
            duration: 3,
            ease: "power1.inOut"
        }).to(bookRef.current, {
            y: 10,
            rotation: -5,
            duration: 4,
            ease: "power1.inOut"
        });

        // Background floating elements
        gsap.to(floatRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }, { scope: containerRef });

    return (
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 px-6 bg-base-100 overflow-hidden" ref={containerRef}>
            <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-[95%] max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200 text-sm font-medium text-primary mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v1.0 is now live
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-base-content">
                        Track your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">reading journey</span>
                    </h1>

                    <p className="text-xl text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Join a community of book lovers. Discover new favorites, track your progress, and share your thoughts with the world.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="/login" className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-primary/30 group">
                            Get Started
                            <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/books" className="btn btn-ghost btn-lg rounded-full">
                            Browse Library
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-80">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-base-content">2k+ Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookMarked className="w-5 h-5 text-secondary" />
                            <span className="font-semibold text-base-content">15k+ Books</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-warning" />
                            <span className="font-semibold text-base-content">4.9/5 Rating</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image/Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-80 h-96 lg:w-[32rem] lg:h-[38rem]">
                        {/* Spinning background element */}
                        <div ref={floatRef} className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full w-full h-full"></div>

                        {/* Main Floating Book Card */}
                        <div ref={bookRef} className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-64 h-80 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-2xl skew-y-3 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="font-bold text-xl mb-1">The Great Gatsby</h3>
                                    <p className="text-sm text-white/80">F. Scott Fitzgerald</p>
                                    <div className="flex gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-warning text-warning" />)}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements behind */}
                            <div className="absolute -z-10 top-10 -right-10 w-48 h-64 bg-secondary rounded-xl opacity-20 -rotate-12 blur-sm"></div>
                            <div className="absolute -z-10 bottom-10 -left-10 w-48 h-64 bg-accent rounded-xl opacity-20 rotate-12 blur-sm"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
