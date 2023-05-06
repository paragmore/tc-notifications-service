import { injectable } from "inversify";
import { NotificationModel } from "../models/notification.model";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class NotificationRepo {
  constructor() {}

  async createNotification(
    subject: string,
    segmentId: string,
    description: string,
    imageUrl?: string
  ) {
    try {
      const notificationDocument = new NotificationModel({
        subject,
        segmentId,
        description,
        imageUrl,
      });
      return await notificationDocument.save();
    } catch (error) {
      console.log(
        "Caught error in NotificationRepo: createNotification =>",
        error
      );
      return new ApiError(
        "Caught error in NotificationRepo: createNotification =>",
        500
      );
    }
  }

  async softDeleteNotification(notificationId: string) {
    try {
      const deletedDocument = await NotificationModel.findByIdAndUpdate(
        notificationId,
        { isDeleted: true }
      );
      return deletedDocument
    } catch (error) {
      console.log(
        "Caught error in NotificationRepo: softDeleteNotification =>",
        error
      );
      return new ApiError(
        "Caught error in NotificationRepo: softDeleteNotification =>",
        500
      );
    }
  }
}
