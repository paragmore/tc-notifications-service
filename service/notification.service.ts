import { inject, injectable } from "inversify";
import { NotificationRepo } from "../repo/notification.repo";

@injectable()
export class NotificationService {
  constructor(@inject(NotificationRepo) private notificationRepo: NotificationRepo) {}
}
