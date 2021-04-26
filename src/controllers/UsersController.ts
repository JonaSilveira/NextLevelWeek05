import { getCustomRepository } from "typeorm"
import {Request, response, Response} from "express"
import { UserRepository } from "../repositories/UsersRepository"
import { UserService } from "../service/UserService"

class UsersController{
  async create(req: Request,res: Response):Promise<Response>{
    
    const {email} = req.body

    const userService = new UserService() 

    try{
      const user = await userService.create(email)

      return res.json(user)
    }
    catch(err){
      return res.status(400).json({
        message: err.message
      })
    }


  }
}

export {UsersController}