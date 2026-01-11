"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, BookOpen, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const password = watch("password");

    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to(blob1Ref.current, {
            y: 50,
            x: -30,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(blob2Ref.current, {
            y: -40,
            x: 30,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
    }, { scope: containerRef });

    const onSubmit = (data) => {
        setIsLoading(true);
        console.log("Registration Data:", data);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen flex bg-base-100 font-sans" ref={containerRef}>
            {/* Left Side - Branding (Hidden on mobile) */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex w-1/2 bg-secondary relative overflow-hidden items-center justify-center text-secondary-content"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary to-primary opacity-90"></div>
                <div ref={blob1Ref} className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div ref={blob2Ref} className="absolute bottom-0 right-0 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-lg px-10 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md mb-8 shadow-xl"
                    >
                        <BookOpen size={40} className="text-white" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h1 className="text-5xl font-bold mb-6 tracking-tight">Join the Community</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Start your journey with thousands of other book lovers. Track, review, and discover your next favorite read.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative pt-24 lg:pt-12">
                <div className="lg:hidden absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-secondary/10 to-transparent -z-10"></div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md space-y-8"
                >
                    <motion.div variants={itemVariants} className="text-center lg:text-left">
                        <div className="lg:hidden inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 text-secondary mb-6">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-base-content">Create an account</h2>
                        <p className="mt-2 text-sm text-base-content/60">
                            Enter your details to get started.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <motion.div variants={itemVariants} className="space-y-4">

                            {/* Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className={`input input-bordered w-full pl-10 focus:input-secondary transition-all duration-200 bg-base-100 ${errors.name ? 'input-error' : ''}`}
                                        {...register("name", { required: "Name is required" })}
                                    />
                                </div>
                                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
                            </div>

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="hello@example.com"
                                        className={`input input-bordered w-full pl-10 focus:input-secondary transition-all duration-200 bg-base-100 ${errors.email ? 'input-error' : ''}`}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full pl-10 pr-10 focus:input-secondary transition-all duration-200 bg-base-100 ${errors.password ? 'input-error' : ''}`}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/70 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className={`input input-bordered w-full pl-10 pr-10 focus:input-secondary transition-all duration-200 bg-base-100 ${errors.confirmPassword ? 'input-error' : ''}`}
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (val) => {
                                                if (watch('password') != val) {
                                                    return "Your passwords do not match";
                                                }
                                            }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/70 transition-colors"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>}
                            </div>

                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className={`btn btn-secondary w-full shadow-lg hover:shadow-secondary/30 transition-all duration-300 ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </motion.button>
                    </form>

                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-base-100 text-base-content/50">Or continue with</span>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-outline border-base-300 hover:border-base-300 hover:text-base-content/90 font-medium normal-case"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-outline border-base-300 hover:border-base-300 hover:text-base-content/90 font-medium normal-case"
                        >
                            <Github size={20} className="mr-2" />
                            GitHub
                        </motion.button>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-center text-sm text-base-content/60">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-secondary hover:text-secondary-focus hover:underline transition-all">
                            Sign in
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
