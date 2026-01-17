import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const MilestoneMarker = ({ milestone }) => {
  const statusClasses = {
    complete: "bg-emerald-500/90 border-emerald-300/60",
    "in-progress": "bg-violet-400/90 border-violet-200/70 animate-pulse",
    pending: "bg-white/20 border-white/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: milestone.id * 0.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className="absolute flex items-center gap-3"
      style={milestone.position}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div
          className={cn(
            "absolute h-3 w-3 rounded-full border-2",
            statusClasses[milestone.status]
          )}
        />
        <div className="absolute h-full w-full rounded-full bg-white/10" />
      </div>
      <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white shadow-sm backdrop-blur">
        {milestone.name}
      </div>
    </motion.div>
  );
};

const HustlerMarker = ({ stops, label = "Hustler en route" }) => {
  if (!stops?.length) return null;

  return (
    <motion.div
      className="absolute flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur"
      style={{ left: stops[0].left, top: stops[0].top }}
      animate={{
        left: stops.map((stop) => stop.left),
        top: stops.map((stop) => stop.top),
      }}
      transition={{
        duration: 14,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <UserRound className="h-4 w-4 text-violet-200" />
      <span className="uppercase tracking-[0.2em] text-[10px] text-white/70">
        {label}
      </span>
    </motion.div>
  );
};

const DestinationMarker = ({ position, label = "Job location" }) => {
  if (!position) return null;

  return (
    <div
      className="absolute flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur"
      style={position}
    >
      <MapPin className="h-4 w-4 text-fuchsia-200" />
      <span className="uppercase tracking-[0.2em] text-[10px] text-white/70">
        {label}
      </span>
    </div>
  );
};

const AnimatedRoadmap = React.forwardRef(
  (
    { className, milestones, mapImageSrc, hustlerStops, destination, ...props },
    ref
  ) => {
    const targetRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);

    return (
      <div
        ref={targetRef}
        className={cn("relative w-full max-w-5xl mx-auto py-24", className)}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute inset-0 top-10"
        >
          <img
            src={mapImageSrc}
            alt="HustleXP routing map"
            className="h-full w-full object-contain opacity-60 saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05030a]/40 via-transparent to-[#05030a]" />
        </motion.div>

        <div className="relative h-[420px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 420"
            preserveAspectRatio="none"
            className="absolute top-0 left-0"
          >
            <motion.path
              d="M 50 360 Q 200 40 420 210 T 760 120"
              fill="none"
              stroke="rgba(139,92,246,0.7)"
              strokeWidth="3"
              strokeDasharray="10 6"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          {milestones.map((milestone) => (
            <MilestoneMarker key={milestone.id} milestone={milestone} />
          ))}
          <HustlerMarker stops={hustlerStops} />
          <DestinationMarker position={destination} />
        </div>
      </div>
    );
  }
);

AnimatedRoadmap.displayName = "AnimatedRoadmap";

export { AnimatedRoadmap };
