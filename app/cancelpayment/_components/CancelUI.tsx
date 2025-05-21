"use client";
import CancelIcon from "@/app/_icons/CancelIcon";
import Link from "next/link";

interface CancelUIProps {
  orderNumber: string;
}

function CancelUI({ orderNumber }: CancelUIProps) {
  return (
    <div className="outer-layout-stripe-redirect">
      <div className="inner-layout-stripe-redirect bg-red-50">
        <CancelIcon />
        <h1 className="text-2xl font-semibold text-red-700">
          Payment Canceled
        </h1>
        <p className="text-lg text-red-800">
          Order <strong>#{orderNumber}</strong> is pending. You can retry
          payment from your orders page.
        </p>
        <Link
          href="/orders"
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Go to Orders Page
        </Link>
      </div>
    </div>
  );
}

export default CancelUI;
