import React from 'react';
import { Link } from 'react-router-dom';

// Simple 404 page for HustleXP

export default function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0F0514] via-[#1A0B2E] to-[#0F0514] text-white p-4">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                404
            </h1>
            <p className="text-xl text-white/70 mb-8">
                Oops! This page doesn't exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold rounded-lg transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
}