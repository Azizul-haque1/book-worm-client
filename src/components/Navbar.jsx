"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import getUser from "@/app/lib/getUser";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { logoutUser } from "@/app/actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();


    console.log(user, 'user');



    const baseLinks = [
        { href: "/my-library", label: "My Library", exact: true },
        { href: "/books", label: "Browse Books" },
        { href: "/tutorials", label: "Tutorials" },
    ];

    const adminLinks = [
        { href: "/admin/dashboard", label: "Dashboard" },
    ];

    const navLinks = [
        ...baseLinks,
        ...(user?.role === "admin" ? adminLinks : []),
    ];



    // Add scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        toast.success("Logged out successfully");
        router.push("/");
    };

    const navbarVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                type: "spring",
                bounce: 0.3
            }
        }
    };





    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-base-100/80 backdrop-blur-xl shadow-lg py-2"
                : "bg-transparent py-4"
                }`}
        >
            <div className="w-[95%] max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
                {/* Left */}
                <div className="flex items-center gap-2">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <Menu className="h-5 w-5" />
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100/90 backdrop-blur-md rounded-2xl w-52 border border-white/10"
                        >
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    exact={link.exact}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent px-0 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="text-primary"
                        >
                            <BookOpen className="w-8 h-8" />
                        </motion.div>
                        <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:inline-block group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                            BookWorm
                        </span>
                    </Link>
                </div>

                {/* Center (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                    <ul className="menu menu-horizontal px-1 gap-1 bg-base-200/50 rounded-full p-1.5 border border-white/5 backdrop-blur-sm shadow-sm">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                exact={link.exact}
                            />
                        ))}
                    </ul>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="coffee" />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,5.64,4.93ZM12,17a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V18A1,1,0,0,0,12,17Zm5.66-1.41a1,1,0,0,0,.71.71l.71-.71a1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17.66,15.59ZM21,12a1,1,0,0,0-1-1H19a1,1,0,0,0,0,2h1A1,1,0,0,0,21,12ZM18.36,6.64a1,1,0,0,0,0-1.41l-.71-.71a1,1,0,0,0-1.41,0l.71.71A1,1,0,0,0,18.36,6.64ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full">
                                    <Image width={40} unoptimized height={40} alt="User" src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-white/10">
                                <li className="menu-title px-4 py-2">
                                    <span className="text-primary font-bold">{user?.name}</span>
                                    <span className="text-xs opacity-50 font-normal truncate">{user?.email}</span>
                                </li>
                                <li>
                                    <Link href="/profile" className="justify-between">
                                        Profile
                                        <span className="badge badge-primary badge-sm">New</span>
                                    </Link>
                                </li>
                                <li><Link href="/settings">Settings</Link></li>
                                <div className="divider my-0"></div>
                                <li><button onClick={handleLogout} className="text-error font-medium">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/register" className="btn btn-ghost btn-sm rounded-full px-4 hidden sm:inline-flex hover:bg-base-200">Register</Link>
                            <Link href="/login" className="btn btn-primary btn-sm rounded-full px-5 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
