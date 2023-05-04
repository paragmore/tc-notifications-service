import { inject, injectable } from "inversify";
import { NotificationService } from "../service/notification.service";
import { RabitMqService } from "../service/rabitmq.service";
import { ApiHelper, ApiHelperHandler, IReply } from "../utils/ApiHelper";

@injectable()
export class NotificationController {
  constructor(
    @inject(NotificationService)
    private notificationService: NotificationService,
    @inject(RabitMqService) private rabitMqService: RabitMqService
  ) {}
  notificationController: ApiHelperHandler<{}, {}, {}, {}, IReply> = async (
    request,
    reply
  ) => {
    return ApiHelper.success(reply, { hello: "world" });
  };
}
