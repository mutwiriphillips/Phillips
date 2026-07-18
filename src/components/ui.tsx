import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Tone = "teal" | "clay";

const TILE_SIZE = {
  sm: { box: "w-9 h-9", icon: 16, radius: "rounded-lg" },
  md: { box: "w-11 h-11", icon: 20, radius: "rounded-xl" },
  lg: { box: "w-14 h-14", icon: 26, radius: "rounded-2xl" },
} as const;

export function IconTile({
  icon: Icon,
  tone = "teal",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: keyof typeof TILE_SIZE;
  className?: string;
}) {
  const s = TILE_SIZE[size];
  const bg = tone === "teal" ? "bg-teal-soft dark:bg-teal/20" : "bg-clay-soft dark:bg-clay/20";
  const fg = tone === "teal" ? "text-teal" : "text-clay";
  return (
    <div className={cn(s.box, s.radius, "flex items-center justify-center flex-shrink-0", bg, className)}>
      <Icon size={s.icon} className={fg} />
    </div>
  );
}

export function Pill({ children, tone = "teal" }: { children: ReactNode; tone?: Tone }) {
  const toneClasses =
    tone === "teal"
      ? "bg-teal-soft text-teal dark:bg-teal/25 dark:text-[#7FD9C6]"
      : "bg-clay-soft text-clay dark:bg-clay/25 dark:text-[#F0AE8D]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full",
        toneClasses
      )}
    >
      {children}
    </span>
  );
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  variant?: "solid" | "outline" | "ghost";
}

export function Btn({ children, tone = "teal", variant = "solid", className, ...rest }: BtnProps) {
  const toneBg = tone === "teal" ? "bg-teal" : "bg-clay";
  const toneBorder = tone === "teal" ? "border-teal" : "border-clay";
  const base = "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";
  const variantClasses =
    variant === "solid"
      ? `${toneBg} text-white`
      : variant === "outline"
      ? `border ${toneBorder} text-ink dark:text-[#EDE9DD] bg-transparent`
      : "text-ink dark:text-[#EDE9DD] bg-transparent";
  return (
    <button className={cn(base, variantClasses, className)} {...rest}>
      {children}
    </button>
  );
}

export function Card({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line dark:border-line-dark bg-white dark:bg-card-dark p-6",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, tone = "teal" }: { children: ReactNode; tone?: Tone }) {
  const color = tone === "teal" ? "text-teal" : "text-clay";
  return <p className={cn("text-xs font-bold tracking-[0.2em] uppercase mb-3", color)}>{children}</p>;
}
