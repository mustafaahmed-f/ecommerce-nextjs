import { redis } from "@/app/_lib/redisClient";
import { channelName } from "@/app/_lib/redisPublishChannel";
import { NextResponse } from "next/server";

export async function POST() {
  await redis.publish(
    channelName,
    JSON.stringify({
      event: "order_created",
      message: "Order #1234 has been placed.",
      userId: "64f1c3aeb345a8c3f019a123",
      audience: "user",
      read: false,
      createdAt: new Date("2025-07-12T14:23:00.123Z"),
      url: "/orders/1234",
    }),
  );

  return NextResponse.json({ success: true });
}
