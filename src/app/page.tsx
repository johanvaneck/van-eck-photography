import Link from "next/link";
import { routes } from "@/lib/routes";
import { headers } from "next/headers";

/* eslint-disable @next/next/no-img-element */
export default async function Home() {
  const hdrs = await headers();
  const host = hdrs.get("host") || "";
  const isLocal = host === "http://lvh.me:3000" || host === "lvh.me:3000"
  const signUpUrl = isLocal ? `http://app.${host}${routes.signUp}` : `https://app.${host}${routes.signUp}`;
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center py-20">
        <h1 className="flex items-center justify-center mb-10">
          <img src="/pici-logo.svg" alt="pici.sh" className="h-32" />
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          The platform built for photographers. Manage shoots, clients, and galleries with ease—designed to help you grow your creative business.
        </p>
        <Link
          href={signUpUrl}
          className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold text-lg shadow-lg hover:bg-gray-800 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {/* Invoices Card */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="12" y2="16" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Invoices</h2>
          <p className="text-gray-600 text-center">Create, send, and manage invoices for your shoots and services. Get paid faster and keep your finances organized.</p>
        </div>
        {/* Shoots Card */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <rect x="8" y="8" width="8" height="5" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Shoots</h2>
          <p className="text-gray-600 text-center">Schedule, organize, and track all your photography shoots in one place. Never miss a session or deadline.</p>
        </div>
        {/* Website Card */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
          <svg className="w-12 h-12 mb-4 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Website</h2>
          <p className="text-gray-600 text-center">Showcase your portfolio and share galleries with clients using your own customizable website.</p>
        </div>
      </section>

      {/* Call to Action */}
      {/* Call to Action Removed: Book Now button deleted as requested */}

      {/* Footer */}
      <footer className="w-full max-w-3xl text-center py-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} pici.sh. All rights reserved.
      </footer>
    </main>
  );
}
