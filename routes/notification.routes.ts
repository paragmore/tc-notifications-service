import "reflect-metadata";
import { FastifyInstance } from "fastify";
import { NotificationController } from "../controllers/notification.controller";
import container from "../inversify.config";
import { ApiHelper } from "../utils/ApiHelper";

export default async (app: FastifyInstance) => {
  const notificationController = container.resolve<NotificationController>(NotificationController)

  ApiHelper.get<{}, {}, {}>(
    app,
    "/",
    notificationController.notificationController.bind(notificationController)
  );
};
