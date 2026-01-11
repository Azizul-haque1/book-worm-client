import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 font-sans">
            <div className="text-center space-y-6 px-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-error/10 text-error mb-4">
                    <AlertTriangle size={48} />
                </div>

                <h1 className="text-6xl font-extrabold text-base-content tracking-tight">404</h1>
                <h2 className="text-2xl font-semibold text-base-content/80">Page Not Found</h2>

                <p className="text-base-content/60 max-w-md mx-auto leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="pt-6">
                    <Link href="/" className="btn btn-primary rounded-full px-8 shadow-lg hover:shadow-primary/30 gap-2">
                        <Home size={20} />
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
