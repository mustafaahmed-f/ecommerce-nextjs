interface CouponAppliedProps {
  coupon: any;
}

function CouponApplied({ coupon }: CouponAppliedProps) {
  return (
    <div className="my-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>{coupon.code} applied</span>
    </div>
  );
}

export default CouponApplied;
