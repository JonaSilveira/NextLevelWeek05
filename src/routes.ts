import {Router} from "express" 
import { SettingsController } from "./controllers/SettingsController"
import { MessageController } from "./controllers/MessageController"
import { UsersController } from "./controllers/UsersController"

const routes = Router()

const settingsController = new SettingsController()
const userController = new UsersController()
const messageController = new MessageController()

routes.post("/settings", settingsController.create)
routes.get("/settings/:username", settingsController.findByUsername)
routes.put("/settings/:username", settingsController.update)

routes.post("/users", userController.create)

routes.post("/messages", messageController.create)
routes.get("/messages/:id", messageController.showByUsers)

export {routes}