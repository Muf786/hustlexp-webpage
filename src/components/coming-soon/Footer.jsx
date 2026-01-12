import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/officialhustlexp' },
    { icon: Twitter, label: 'X', href: 'https://x.com/HustleXpApp' }
  ];

  return (
    <footer className="py-12 px-4 bg-[#05030a] border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-white font-display">HustleXP</p>
          <p className="text-sm text-slate-500">© 2025 All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 hidden md:block">Follow</span>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-200 transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
