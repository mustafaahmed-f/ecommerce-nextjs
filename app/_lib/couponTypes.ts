export const couponType = {
  PERCENTAGE: "percentage",
  AMOUNT: "amount",
} as const;

export type CouponType = (typeof couponType)[keyof typeof couponType];
