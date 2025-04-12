"use client";
interface ButtonProps {
  // Define the props for the Button component here
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

function Button({
  label,
  onClick,
  disabled = false,
  variant,
  size,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        variant === "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
      } ${
        size === "small"
          ? "px-2 py-1 text-sm"
          : size === "medium"
            ? "px-4 py-2 text-base"
            : size === "large"
              ? "px-6 py-3 text-lg"
              : ""
      }`}
    >
      {label}
    </button>
  );
}

export default Button;
