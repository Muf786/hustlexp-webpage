import React from "react";
import { AnimatedRoadmap } from "@/components/ui/hero-section-5";

const milestones = [
  {
    id: 1,
    name: "Request posted",
    status: "complete",
    position: { top: "70%", left: "6%" },
  },
  {
    id: 2,
    name: "Hustler verified",
    status: "complete",
    position: { top: "22%", left: "22%" },
  },
  {
    id: 3,
    name: "Matched in minutes",
    status: "in-progress",
    position: { top: "46%", left: "52%" },
  },
  {
    id: 4,
    name: "Task completed",
    status: "pending",
    position: { top: "16%", right: "10%" },
  },
];

const hustlerStops = [
  { top: "78%", left: "8%" },
  { top: "56%", left: "26%" },
  { top: "44%", left: "52%" },
  { top: "30%", left: "72%" },
];

export default function CityRoadmap() {
  return (
    <section className="relative bg-[#05030a] px-4 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_55%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-violet-200">
          Live routing
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl font-display">
          Watch a hustler move across the city
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300/80 md:text-lg">
          HustleXP dispatches verified workers fast. You see every step, from
          request to arrival, so tasks feel tangible and trustworthy.
        </p>
      </div>

      <AnimatedRoadmap
        className="mt-10"
        milestones={milestones}
        mapImageSrc="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
        hustlerStops={hustlerStops}
        destination={{ top: "22%", right: "6%" }}
        aria-label="HustleXP routing map with live milestones"
      />
    </section>
  );
}
