import SingleReview from "./SingleReview";

type Review = {
  name: string;
  rating: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
};

interface ProductReviewsSectionProps {
  reviews: Review[];
}

function ProductReviewsSection({ reviews }: ProductReviewsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.length > 0 ? (
        reviews.map((review, index) => <SingleReview key={index} {...review} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No reviews available.
        </p>
      )}
    </div>
  );
}

export default ProductReviewsSection;
