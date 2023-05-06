import { inject, injectable } from "inversify";
import { NotificationModel } from "../models/notification.model";
import { NotificationRepo } from "../repo/notification.repo";
import { CreateNotificationI } from "../types/types";

@injectable()
export class NotificationService {
  constructor(
    @inject(NotificationRepo) private notificationRepo: NotificationRepo
  ) {}

  async createNotification(notification: CreateNotificationI) {
    const { description, subject, segmentId, imageUrl } = notification;
    const response = await this.notificationRepo.createNotification(
      subject,
      segmentId,
      description,
      imageUrl
    );
    return response
  }

  async deleteNotification(notificationId: string){
    const response = await this.notificationRepo.softDeleteNotification(notificationId)
    return response
  }
}
