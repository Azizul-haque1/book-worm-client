"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookText, Users, MessageSquare, Tags, Settings, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/app/actions/auth";
import Image from "next/image";

const sidebarLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/books", label: "Books", icon: <BookText size={20} /> },
    { href: "/admin/genres", label: "Genres", icon: <Tags size={20} /> },
    { href: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { href: "/admin/reviews", label: "Reviews", icon: <MessageSquare size={20} /> },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, setUser } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            toast.success("Logged out successfully");
            router.push("/login");
        }
        catch (error) {
            console.error(error.message);
            toast.error("Logout failed");
        }
    }

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b border-base-300 justify-between">
                <Logo />
                <button
                    className="btn btn-ghost btn-square lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <X size={24} />
                </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-4">Management</h2>
                <ul className="menu bg-base-100 p-0 gap-2">
                    {sidebarLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname === link.href ? "active font-medium" : "text-base-content/70 font-medium"}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h2 className="text-xs font-bold text-base-content/50 uppercase tracking-wider mt-8 mb-4">System</h2>
                <ul className="menu bg-base-100 p-0 gap-2">
                    <li>
                        <Link href="/" className="text-base-content/70 font-medium">
                            <BookText size={20} />
                            View Site
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className="text-base-content/70 font-medium">
                            <Settings size={20} />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="text-error font-medium">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="fixed inset-y-0 left-0 w-72 bg-base-100 z-[70] lg:hidden border-r border-base-300"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar (Fixed) */}
            <aside className="w-64 bg-base-100 hidden lg:block border-r border-base-300 fixed h-full top-0 z-50">
                <SidebarContent />
            </aside>

            {/* Main Content Wrapper (shifted right by sidebar width) */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">

                {/* Header (Sticky top) */}
                <header className="sticky top-0 bg-base-100 border-b border-base-300 z-40 h-16 flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            className="btn btn-square btn-ghost"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-lg">BookWorm Admin</span>
                    </div>

                    <div className="flex-1 hidden lg:flex items-center gap-4">
                        <h1 className="text-lg font-bold">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="btn btn-circle btn-ghost btn-sm">
                            <div className="indicator">
                                <MessageSquare size={20} />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>
                        <div className="avatar placeholder">
                            <div className="w-8 rounded-full">
                                <Image
                                    width={32}
                                    height={32}
                                    unoptimized
                                    alt="User"
                                    src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
