"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function NavLink({ href, label, exact = false }) {
    const pathname = usePathname();

    const isActive = exact
        ? pathname === href
        : pathname.startsWith(href);

    return (
        <li>
            <Link
                href={href}
                className="relative block px-3 py-2 rounded-full transition-colors"
            >
                {/* Active Background Pill */}
                {isActive && (
                    <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-primary/10 rounded-full z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}

                {/* Link Text */}
                <span className={clsx(
                    "relative z-10 font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-base-content/70 hover:text-base-content"
                )}>
                    {label}
                </span>
            </Link>
        </li>
    );
}
