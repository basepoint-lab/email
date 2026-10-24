"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";

export interface StarRatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  rating?: number; // 0 to 5
  maxRating?: number;
  label?: string;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export function StarRating({
  rating = 5,
  maxRating = 5,
  label,
  showScore = true,
  size = "md",
  interactive = false,
  onChange,
  className = "",
  ...props
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const activeRating = hoverRating !== null ? hoverRating : rating;

  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD0] text-xs font-mono font-bold text-[#003922] shadow-2xs ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      <div
        className="flex text-amber-500 gap-0.5"
        onMouseLeave={() => interactive && setHoverRating(null)}
      >
        {stars.map((starIndex) => {
          const filled = starIndex <= Math.round(activeRating);
          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starIndex)}
              onMouseEnter={() => interactive && setHoverRating(starIndex)}
              className={`p-0.5 rounded transition-transform ${
                interactive ? "hover:scale-125 focus:outline-none cursor-pointer" : "cursor-default"
              }`}
              aria-label={`Rate ${starIndex} of ${maxRating} stars`}
            >
              <Star
                className={`${sizeClasses[size]} ${filled ? "fill-current" : "text-gray-300"}`}
              />
            </button>
          );
        })}
      </div>
      {showScore && <span>{activeRating.toFixed(1)}/{maxRating}</span>}
      {label && <span className="text-[#5e665d] font-normal">· {label}</span>}
    </div>
  );
}

export default StarRating;
