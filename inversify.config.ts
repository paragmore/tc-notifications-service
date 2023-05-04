import "reflect-metadata";
import { Container } from "inversify";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationRepo } from "./repo/notification.repo";
import { NotificationService } from "./service/notification.service";
import { RabitMqService } from "./service/rabitmq.service";

const container = new Container();

container.bind<NotificationService>(NotificationService).toSelf();
container.bind<NotificationRepo>(NotificationRepo).toSelf();
container.bind<NotificationController>(NotificationController).toSelf();
container.bind<RabitMqService>(RabitMqService).toSelf().inSingletonScope();

export default container;
