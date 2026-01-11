"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { title: "Total Users", value: "2,453", icon: <Users className="w-8 h-8 text-white" />, color: "bg-primary" },
        { title: "Total Books", value: "15,340", icon: <BookOpen className="w-8 h-8 text-white" />, color: "bg-secondary" },
        { title: "Reviews", value: "4,200", icon: <MessageSquare className="w-8 h-8 text-white" />, color: "bg-accent" },
        { title: "Active Readers", value: "85%", icon: <TrendingUp className="w-8 h-8 text-white" />, color: "bg-success" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ${stat.color} text-white`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="opacity-80 font-medium mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                {stat.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity Mockup */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
                    <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 py-2 border-b border-base-100 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">New user registered</p>
                                    <p className="text-xs text-base-content/50">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
                    <h3 className="font-bold text-lg mb-4">Growth Analytics</h3>
                    <div className="h-48 bg-base-200/50 rounded-xl flex items-center justify-center text-base-content/50">
                        Chart Visualization Here
                    </div>
                </div>
            </div>
        </div>
    );
}
