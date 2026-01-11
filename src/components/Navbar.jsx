"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="navbar fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-base-100/60 backdrop-blur-xl shadow-2xl border border-white/20 px-6"
        >
            {/* Left */}
            <div className="navbar-start">
                {/* Mobile Menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100/90 backdrop-blur-md rounded-2xl w-52 border border-white/10"
                    >
                        <NavLink href="/my-library" label="My Library" exact />
                        <NavLink href="/books" label="Browse Books" />
                        <NavLink href="/tutorials" label="Tutorials" />
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent px-0">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="text-primary"
                    >
                        <BookOpen className="w-7 h-7" />
                    </motion.div>
                    <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:inline-block">BookWorm</span>
                </Link>
            </div>

            {/* Center (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 bg-base-200/50 rounded-full p-1 border border-white/5">
                    <NavLink href="/my-library" label="My Library" exact />
                    <NavLink href="/books" label="Browse Books" />
                    <NavLink href="/tutorials" label="Tutorials" />
                </ul>
            </div>

            {/* Right */}
            <div className="navbar-end">
                <label className="swap swap-rotate mr-4 btn btn-ghost btn-circle">
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
                <Link href="/register" className="btn btn-ghost btn-sm rounded-full px-4 mr-2">Register</Link>
                <Link href="/login" className="btn btn-primary btn-sm rounded-full px-4">Login</Link>
            </div>
        </motion.div>
    );
}
