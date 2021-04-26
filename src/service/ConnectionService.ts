import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { Connection } from '../database/entities/Connection';
import {ConnectionsRepository} from '../repositories/ConnectionRepository'

interface IConnectionCreate{
  socket_id:string,
  user_id:string,
  admin_id?:string,
  id?:string
}

class ConnectionService {
  private connectionsRepository : Repository<Connection>
  
  constructor(){
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({socket_id, user_id,admin_id, id}:IConnectionCreate){
    const connection = this.connectionsRepository.create({
      socket_id,
      id,
      admin_id,
      user_id
    })

    await this.connectionsRepository.save(connection)

    return connection

  }
  
  async findByUserId(user_id: string){
    const connection = this.connectionsRepository.findOne({
      user_id
    })
    return connection
  }

  async allConnectionsWithOutAdmin(){
    const connections = this.connectionsRepository.find({
      where:{admin_id:null},
      relations:["user"]
    }) 
    return connections
  }

  async findBySocketId(socket_id:string){

    const connection = this.connectionsRepository.findOne({socket_id})
    return connection
  }

}

export {ConnectionService}
