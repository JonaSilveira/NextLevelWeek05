import {EntityRepository, Repository} from "typeorm"

import {Message} from "../database/entities/Message"

@EntityRepository(Message)
class MessagesRepository extends Repository<Message>{}

export{MessagesRepository}

