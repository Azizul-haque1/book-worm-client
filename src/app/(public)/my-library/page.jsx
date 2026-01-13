"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const books1 = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
    progress: 45,
    total: 100,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300",
    progress: 12,
    total: 320,
  },
];

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState("reading");
  const { user } = useAuth()
  console.log(user);

  const tabs = [
    { id: "reading", label: "Currently Reading", icon: <Book className="w-4 h-4" /> },
    { id: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
    { id: "wishlist", label: "Want to Read", icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Library</h1>
            <p className="text-base-content/70">Manage your reading progress and collection.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn rounded-full gap-2 ${activeTab === tab.id
                ? "btn-primary text-white"
                : "btn-ghost hover:bg-base-200"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === "reading" &&
            books1.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-base-100 rounded-2xl p-4 border border-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-4 relative group">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold truncate">{book.title}</h3>
                <p className="text-sm text-base-content/60 mb-3">{book.author}</p>
                <div className="w-full bg-base-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${(book.progress / book.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-base-content/50 text-right">
                  {Math.round((book.progress / book.total) * 100)}% Complete
                </p>
              </motion.div>
            ))}

          {activeTab !== "reading" && (
            <div className="col-span-full py-20 text-center opacity-50">
              <Book className="w-16 h-16 mx-auto mb-4 text-base-300" />
              <p>No books in this list yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
