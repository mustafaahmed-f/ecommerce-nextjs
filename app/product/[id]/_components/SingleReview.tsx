import Rating from "@/app/_components/Rating";
import DislikeIcon from "@/app/_icons/DislikeIcon";
import LikeIcon from "@/app/_icons/LikeIcon";
interface SingleReviewProps {
  name?: string;
  rating?: number;
  title?: string;
  content?: string;
  likes?: number;
  dislikes?: number;
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
          <Rating value={rating!} readOnly />
        </div>
      </div>

      <p className="text-sm text-cyan-500">By {name}</p>

      <p className="mt-2 text-gray-700">{content}</p>

      <div className="mt-4 flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
          <LikeIcon /> {likes}
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
          <DislikeIcon /> {dislikes}
        </button>
      </div>
    </div>
  );
}

export default SingleReview;
