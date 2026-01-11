'use client'
import React from 'react';
import { motion } from "framer-motion";
import { BookOpen } from 'lucide-react';
import Link from "next/link";

const Logo = () => {
    return <Link href="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent px-0">
        <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="text-primary"
        >
            <BookOpen className="w-7 h-7" />
        </motion.div>
        <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:inline-block">BookWorm</span>
    </Link>
};

export default Logo;