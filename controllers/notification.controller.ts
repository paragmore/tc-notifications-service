import { inject, injectable } from "inversify";
import { NotificationService } from "../service/notification.service";
import { RabitMqService } from "../service/rabitmq.service";
import { CreateNotificationI, DeleteNotificationI } from "../types/types";
import {
  ApiError,
  ApiHelper,
  ApiHelperHandler,
  IReply,
} from "../utils/ApiHelper";

@injectable()
export class NotificationController {
  constructor(
    @inject(NotificationService)
    private notificationService: NotificationService,
    @inject(RabitMqService) private rabitMqService: RabitMqService
  ) {}

  createNotification: ApiHelperHandler<
    CreateNotificationI,
    {},
    {},
    {},
    IReply
  > = async (request, reply) => {
    const { body } = request;
    if (!body?.subject || !body.segmentId || !body.description) {
      return ApiHelper.missingParameters(reply);
    }
    try {
      const notificationResponse =
        await this.notificationService.createNotification(body);
      if (notificationResponse instanceof ApiError) {
        return ApiHelper.callFailed(
          reply,
          notificationResponse.message,
          notificationResponse.code
        );
      }
      return ApiHelper.success(reply, notificationResponse);
    } catch (error) {
      console.error(
        "Caught Error in NotificationController: createNotification => ",
        error
      );
      return ApiHelper.callFailed(
        reply,
        "Caught Error in NotificationController: createNotification => ",
        500
      );
    }
  };

  deleteNotification: ApiHelperHandler<
    DeleteNotificationI,
    {},
    {},
    {},
    IReply
  > = async (request, reply) => {
    const { body } = request;
    if (!body?.notificationId) {
      return ApiHelper.missingParameters(reply);
    }
    try {
      const notificationResponse =
        await this.notificationService.deleteNotification(body.notificationId);
      if (notificationResponse instanceof ApiError) {
        return ApiHelper.callFailed(
          reply,
          notificationResponse.message,
          notificationResponse.code
        );
      }
      if (!notificationResponse) {
        return ApiHelper.callFailed(reply, "Notification not found", 400);
      }
      return ApiHelper.success(reply, notificationResponse);
    } catch (error) {
      console.error(
        "Caught Error in NotificationController: createNotification => ",
        error
      );
      return ApiHelper.callFailed(
        reply,
        "Caught Error in NotificationController: createNotification => ",
        500
      );
    }
  };
}
