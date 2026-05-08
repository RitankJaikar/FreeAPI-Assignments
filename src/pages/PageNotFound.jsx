import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { BackToHome } from "../components";

const PageNotFound = () => {
  return (
    <div className="space-y-6">
      <BackToHome />

      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          Error
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-white">Page Not Found</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </section>

      <hr className="border-zinc-800" />

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-8xl font-bold text-red-500 mb-4">404</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md">
          Oops! It looks like the page you're trying to reach isn't available.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
