import React, { useState } from "react";
import { cn } from "@/lib/utils";

function TwitterIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg className="size-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function TestimonialCard({
  className,
  avatar,
  username = "PEPE",
  handle = "@PEPE_bigbrother",
  content = "This is amazing! Absolutely loving what the team is building here.",
  date = "Jan 5, 2026",
  verified = true,
  likes = 142,
  retweets = 23,
  tweetUrl,
  onHover,
  onLeave,
  isActive,
  onTap,
}) {
  const handleClick = (e) => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      if (!isActive) {
        e.preventDefault();
        onTap?.();
      }
    }
  };

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex h-auto min-h-[140px] sm:min-h-[180px] w-[260px] sm:w-[380px] -skew-y-[8deg] select-none flex-col rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-3 sm:py-4 transition-all duration-500 hover:border-white/25 hover:bg-white/15 cursor-pointer",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#05030a] after:to-transparent after:content-[''] after:pointer-events-none",
        isActive && "ring-2 ring-violet-400/40",
        className
      )}
    >
      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="size-9 sm:size-12 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-indigo-400 flex items-center justify-center overflow-hidden shrink-0">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg sm:text-2xl">✨</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white truncate text-xs sm:text-base">
              {username}
            </span>
            {verified && <VerifiedBadge />}
          </div>
          <span className="text-white/60 text-[10px] sm:text-sm">
            {handle}
          </span>
        </div>
        <TwitterIcon className="size-4 sm:size-5 text-white/70 shrink-0" />
      </div>

      <p className="text-white/90 text-xs sm:text-[15px] leading-relaxed mb-2 sm:mb-3 line-clamp-3 sm:line-clamp-4">
        {content}
      </p>

      <div className="flex items-center justify-between text-white/50 text-[10px] sm:text-sm mt-auto">
        <span>{date}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>{retweets}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Testimonials({ cards }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const getCardClassName = (index, baseClassName) => {
    const focusedIndex = hoveredIndex ?? activeIndex;

    if (focusedIndex === 0 && index === 1) {
      return `${baseClassName} !translate-y-20 sm:!translate-y-32 !translate-x-14 sm:!translate-x-24`;
    }
    if (focusedIndex === 0 && index === 2) {
      return `${baseClassName} !translate-y-28 sm:!translate-y-44 !translate-x-24 sm:!translate-x-40`;
    }
    if (focusedIndex === 1 && index === 2) {
      return `${baseClassName} !translate-y-24 sm:!translate-y-40 !translate-x-24 sm:!translate-x-40`;
    }
    return baseClassName;
  };

  const handleTap = (index) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
  };

  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/5 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=200&h=200&q=80",
      username: "Jordan Lee",
      handle: "@jordanbuilds",
      content:
        "Joined the HustleXP beta list today. The UI feels premium and the flow is insanely clear.",
      date: "Jan 9, 2026",
      verified: true,
      likes: 184,
      retweets: 32,
      tweetUrl: "https://x.com",
    },
    {
      className:
        "[grid-area:stack] translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/5 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&h=200&q=80",
      username: "Camille Ruiz",
      handle: "@camilleops",
      content:
        "This makes hiring for short gigs feel legit. Love the trust signal and pacing.",
      date: "Jan 8, 2026",
      verified: true,
      likes: 96,
      retweets: 14,
      tweetUrl: "https://x.com",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 sm:translate-x-32 translate-y-12 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=200&h=200&q=80",
      username: "Devon Park",
      handle: "@devonparker",
      content:
        "The HustleXP roadmap and live routing visuals are so clean. Feels like the future of local work.",
      date: "Jan 7, 2026",
      verified: true,
      likes: 212,
      retweets: 41,
      tweetUrl: "https://x.com",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <TestimonialCard
          key={`${cardProps.handle}-${index}`}
          {...cardProps}
          className={getCardClassName(index, cardProps.className || "")}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          isActive={activeIndex === index}
          onTap={() => handleTap(index)}
        />
      ))}
    </div>
  );
}

function Component() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-8">
      <Testimonials />
    </div>
  );
}

export { TestimonialCard, Testimonials, Component };
