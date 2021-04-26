import { getCustomRepository } from 'typeorm';
import {MessagesRepository} from '../repositories/MessageRepository'

interface IMessageService{
    admin_id?:string,
    text:string,
    user_id:string
}

class MessageService{ 
  async create({admin_id,
    text,
    user_id}:IMessageService){
      const messageRepository = getCustomRepository(MessagesRepository)

      const message = await messageRepository.create({
        admin_id,
        text,
        user_id
      })

      await messageRepository.save(message)

      return message
    }

    async showById(user_id: string){   

      const messageRepository = getCustomRepository(MessagesRepository)

      const list = await messageRepository.find({
        where:{user_id},
        relations:["user"]
      })

      return list

    }
}

export{MessageService}