"use client";

import { Edit, Trash2, Plus, Tag } from "lucide-react";

const genres = [
    { id: 1, name: "Fiction", count: 1240 },
    { id: 2, name: "Science Fiction", count: 856 },
    { id: 3, name: "Self-Help", count: 645 },
    { id: 4, name: "History", count: 432 },
    { id: 5, name: "Romance", count: 980 },
];

export default function AdminGenres() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Genres</h1>
                <button className="btn btn-primary gap-2">
                    <Plus size={18} />
                    Add Genre
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {genres.map((genre) => (
                    <div key={genre.id} className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Tag size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{genre.name}</h3>
                                <p className="text-sm text-base-content/60">{genre.count} books</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="btn btn-circle btn-ghost btn-sm text-primary"><Edit size={16} /></button>
                            <button className="btn btn-circle btn-ghost btn-sm text-error"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
