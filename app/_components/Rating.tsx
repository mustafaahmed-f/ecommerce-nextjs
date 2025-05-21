import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number; // e.g. 3.5
  max?: number; // default 5
  readOnly?: boolean;
  size?: number; // in pixels
}

export default function Rating({ value, max = 5, size = 20 }: RatingProps) {
  // Clamp value between 0 and max
  const safeValue = Math.min(Math.max(value ?? 0, 0), max);

  const fullStars = Math.floor(safeValue);
  const hasHalfStar = safeValue - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className="flex items-center space-x-0.5"
      aria-label={`Rating: ${safeValue} out of ${max}`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} className="text-yellow-400" />
      ))}

      {hasHalfStar && <StarHalf size={size} className="text-yellow-400" />}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
}
