import { FastifyInstance } from "fastify"
import notificationRoutes from "./routes/notification.routes"
export default async(app: FastifyInstance)=>{
    app.register(notificationRoutes, {prefix:'/notification'})
}