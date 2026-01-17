import { cn } from "@/lib/utils"

/**
 * ShineBorder - Animated glowing border effect
 * Adapted for HustleXP's violet/fuchsia color scheme
 */
export function ShineBorder({
  borderRadius = 24,
  borderWidth = 1,
  duration = 14,
  color = ["#8b5cf6", "#d946ef", "#6366f1"],
  className,
  children,
}) {
  return (
    <div
      style={{
        "--border-radius": `${borderRadius}px`,
      }}
      className={cn(
        "relative min-h-[60px] w-full rounded-[--border-radius] p-[1px]",
        className
      )}
    >
      <div
        style={{
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent, ${Array.isArray(color) ? color.join(",") : color},transparent,transparent)`,
        }}
        className="pointer-events-none absolute inset-0 rounded-[--border-radius] before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%] before:[mask:var(--mask-linear-gradient)] before:animate-shine"
      />
      {children}
    </div>
  )
}
