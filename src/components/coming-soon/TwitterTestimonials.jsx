import React from "react";
import { Testimonials } from "@/components/ui/twitter-testimonial-cards";

export default function TwitterTestimonials() {
  return (
    <section className="relative overflow-hidden bg-[#05030a] px-4 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent_55%),radial-gradient(circle_at_bottom,rgba(88,28,135,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_45%,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-violet-200">
          From the community
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl font-display">
          People are already talking about HustleXP
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate-300/80 md:text-lg">
          Early testers love the clarity, trust signals, and speed. Real feedback,
          real momentum.
        </p>

        <div className="mt-12">
          <Testimonials />
        </div>
      </div>
    </section>
  );
}
