import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
}

export const StarRating = ({ value, onChange, size = 16 }: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onChange}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange && onChange(star)}
          className={onChange ? "cursor-pointer transition hover:scale-110" : "cursor-default"}
          aria-label={`${star} bintang`}
        >
          <Star
            size={size}
            className={
              star <= active
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
};