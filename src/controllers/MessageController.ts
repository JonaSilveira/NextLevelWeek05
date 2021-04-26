import { getCustomRepository } from "typeorm"
import {Request, response, Response} from "express"
import { UserRepository } from "../repositories/UsersRepository"
import { MessageService } from "../service/MessageService"

class MessageController{
  async create(req: Request,res: Response):Promise<Response>{
    
    const {admin_id, text, user_id} = req.body

    const messageService = new MessageService() 

    try{
      const message = await messageService.create({admin_id, text, user_id})

      return res.json(message)
    }
    catch(err){
      return res.status(400).json({
        message: err.message
      })
    }


  }

  async showByUsers(req: Request, res: Response){
    const {id} = req.params
    
    const messagesService = new MessageService()

    const list = await messagesService.showById(id)

    return res.json(list)

  }

}

export {MessageController}