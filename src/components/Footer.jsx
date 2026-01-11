import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-base-300 text-base-content pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* Brand */}
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <BookOpen className="w-8 h-8" />
                        <span className="font-extrabold text-2xl">BookWorm</span>
                    </div>
                    <p className="opacity-70 mb-6">
                        Your digital sanctuary for reading, tracking, and discovering new worlds.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h4 className="font-bold text-lg mb-4">Platform</h4>
                    <ul className="space-y-2 opacity-70">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/books" className="hover:text-primary transition-colors">Browse Books</Link></li>
                        <li><Link href="/communities" className="hover:text-primary transition-colors">Communities</Link></li>
                        <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h4 className="font-bold text-lg mb-4">Support</h4>
                    <ul className="space-y-2 opacity-70">
                        <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                        <li><Link href="/guidelines" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-lg mb-4">Stay Included</h4>
                    <p className="opacity-70 mb-4 text-sm">Get the latest book trends delivered to your inbox.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-sm rounded-l-lg rounded-r-none w-full bg-base-100 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button className="btn btn-sm btn-primary rounded-l-none rounded-r-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-base-content/10 max-w-7xl mx-auto px-6 pt-8 text-center opacity-50 text-sm">
                <p>&copy; {new Date().getFullYear()} BookWorm. All rights reserved.</p>
            </div>
        </footer>
    );
}
