import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository'

class UserService{
  private usersRepository = getCustomRepository(UserRepository);
  async create(email:string){ 
    
    const userAlreadyExist = this.findByEmail(email)
    console.log(email)

    if(userAlreadyExist === null){ 
      return userAlreadyExist
    } 
 
    const user = this.usersRepository.create({
      email
    }) 
    await this.usersRepository.save(user) 
    return user

  }

  async findByEmail(email){ 
    const userAlreadyExist = await this.usersRepository.findOne({
      email
    }) 
    return userAlreadyExist
  }

}

export {UserService}