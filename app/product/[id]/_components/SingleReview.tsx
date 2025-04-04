import { Star, ThumbsUpDown } from "@mui/icons-material";

interface SingleReviewProps {
  name: string;
  rating: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
}

function SingleReview({
  name,
  rating,
  title,
  content,
  likes,
  dislikes,
}: SingleReviewProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400" : "fill-gray-300"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-600">By {name}</p>

      <p className="mt-2 text-gray-700">{content}</p>

      <div className="mt-4 flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
          <ThumbsUpDown className="h-4 w-4" /> {likes}
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
          <ThumbsUpDown className="h-4 w-4" /> {dislikes}
        </button>
      </div>
    </div>
  );
}

export default SingleReview;
