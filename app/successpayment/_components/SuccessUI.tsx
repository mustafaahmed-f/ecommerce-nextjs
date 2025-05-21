"use client";
import CheckCircleIcon from "@/app/_icons/CheckCircleIcon";
import { motion } from "framer-motion";

interface SuccessUIProps {
  orderNumber: string;
}

function SuccessUI({ orderNumber }: SuccessUIProps) {
  return (
    <div className="outer-layout-stripe-redirect">
      <div className="inner-layout-stripe-redirect bg-green-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-green-600"
        >
          <CheckCircleIcon />
        </motion.div>
        <h1 className="text-2xl font-semibold text-green-700">
          Payment Successful!
        </h1>
        <p className="text-lg text-green-800">
          Your order <strong>#{orderNumber}</strong> has been placed.
        </p>
      </div>
    </div>
  );
}

export default SuccessUI;
