import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { NotificationController } from "../controllers/notification.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";
import { CreateNotificationI, DeleteNotificationI } from "../types/types";

export default async (app: FastifyInstance) => {
  const notificationController = container.resolve<NotificationController>(NotificationController)

  ApiHelper.post<CreateNotificationI, {}, {},{}>(
    app,
    "/create",
    notificationController.createNotification.bind(notificationController)
  );
  ApiHelper.post<DeleteNotificationI, {}, {},{}>(
    app,
    "/delete",
    notificationController.deleteNotification.bind(notificationController)
  );
};
