interface AddToBasketIconProps {}

function AddToBasketIcon({}: AddToBasketIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6"
        stroke="#434343"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6665 13L19.5569 6.3424C19.2355 4.41365 17.5667 3 15.6113 3H8.38836C6.433 3 4.76424 4.41365 4.44278 6.3424L2.77612 16.3424C2.36976 18.7805 4.24994 21 6.72169 21H12.9999"
        stroke="#434343"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 15L19 21"
        stroke="#434343"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 18L16 18"
        stroke="#434343"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AddToBasketIcon;
