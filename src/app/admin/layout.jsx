"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookText, Users, MessageSquare, Tags, Settings, LogOut } from "lucide-react";
import Logo from "@/components/shared/Logo";

const sidebarLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/books", label: "Books", icon: <BookText size={20} /> },
    { href: "/admin/genres", label: "Genres", icon: <Tags size={20} /> },
    { href: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { href: "/admin/reviews", label: "Reviews", icon: <MessageSquare size={20} /> },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Admin Header (Mobile & Desktop) */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-base-100 border-b border-base-300 z-50 flex items-center justify-between px-6 lg:ml-64">
                <div className="lg:hidden">
                    <button className="btn btn-square btn-ghost">
                        <LayoutDashboard size={24} />
                    </button>
                    {/* Add sidebar toggle logic if needed later */}
                </div>
                <div className="font-bold text-lg lg:hidden">BookWorm Admin</div>
                <div className="flex-1 hidden lg:flex items-center gap-4">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    {/* Search Bar could go here */}
                </div>
                <div className="flex items-center gap-4">
                    <button className="btn btn-circle btn-ghost btn-sm">
                        <div className="indicator">
                            <MessageSquare size={20} />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">A</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="w-64 bg-base-100 hidden lg:flex flex-col border-r border-base-300 fixed h-full top-0 z-50">
                <div className="h-16 flex items-center px-6 border-b border-base-300">
                    {/* <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <BookText size={24} />
                        BookWorm
                    </Link> */}
                    <Logo />
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
                            <button className="text-error font-medium">
                                <LogOut size={20} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8 pt-24">
                {children}
            </main>
        </div>
    );
}
