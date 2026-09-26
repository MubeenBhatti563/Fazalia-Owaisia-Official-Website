import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  isDark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  subtitle,
  isDark = false,
  className = "",
}) => {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 sm:mb-16", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-sm",
          isDark
            ? "bg-gold-500/20 text-gold-300 border border-gold-400/50"
            : "bg-gold-50 text-gold-600 border border-gold-400"
        )}
      >
        {tag}
      </span>
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight mb-4",
          isDark ? "text-white drop-shadow-md" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium",
            isDark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
