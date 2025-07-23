import { notification } from "@/app/_types/NotificationsType";
import { GenerateNotificationMessage } from "./GenerateNotificationMessage";
import { GenerateEvents } from "./GenerateEvents";
import { actions } from "../actions";
import { ModulesArray } from "../ModulesArray";
import notificationsModel from "@/app/_mongodb/models/notificationsModel";
import { channelName } from "../redisPublishChannel";
import { redis } from "../redisClient";

export async function PushNotification(
  adminId: string,
  module: (typeof ModulesArray)[number],
  eventAction: (typeof actions)[keyof typeof actions],
  messageAction: keyof typeof actions,
  title: string,
  url?: string,
) {
  const notificationObj: Omit<notification, "_id"> = {
    event: GenerateEvents(module, eventAction),
    message: GenerateNotificationMessage(module, title, messageAction),
    url:
      messageAction === "deleted" && eventAction === "Deleted"
        ? ""
        : (url ?? ""),
    audience: "admin",
    module: module,
    userId: adminId,
    read: false,
    createdAt: new Date(),
  };

  const newNotification = await notificationsModel.create(notificationObj);
  if (!newNotification) throw new Error("Failed creating notification");

  await redis.publish(channelName, JSON.stringify(newNotification.toObject()));
}
