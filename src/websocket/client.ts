import {io} from '../http'
import {ConnectionService} from '../service/ConnectionService'
import { MessageService } from '../service/MessageService'
import {UserService} from '../service/UserService'

interface IParams{
  text: string,
  email: string
}

io.on("connect", (socket)=>{

  const connectionsService = new ConnectionService()
  const userService = new UserService()
  const messageService = new MessageService()

  let user_id = null

  socket.on("client_first_access",async (params)=>{
    const socket_id = socket.id
    const {text, email} = params as IParams
 
    const userExists = await userService.findByEmail(email) 
    if(!userExists){ 
      const user = await userService.create(email) 
      connectionsService.create({
        socket_id,
        user_id:user.id,
      })
      user_id = user.id
    }else{ 
      const connection = await connectionsService.findByUserId(userExists.id)
      user_id = userExists.id

      if(!connection){
        connectionsService.create({
          socket_id,
          user_id:userExists.id,
        })
      }else{
        connection.socket_id = socket_id
        await connectionsService.create(connection)
      }
    }

    await messageService.create({
      text,
      user_id
    })

    const allMessages = await messageService.showById(user_id)

    socket.emit("client_list_all_messages", allMessages)
    const allUsers = await connectionsService.allConnectionsWithOutAdmin()
    io.emit("admin_list_all_users", allUsers)
  })

  socket.on("client_send_to_admin",async (params) => {

    const {text, socket_admin_id} = params

    const socket_id = socket.id

    const {user_id} = await connectionsService.findBySocketId(socket_id)

    const message = await messageService.create({
      text, user_id
    })

    io.to(socket_admin_id).emit("admin_received_message", {
      message,
      socket_id
    })

  })

})