import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Message } from '../message/message.entity';
import { Chat } from '../chat/chat.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true ,nullable: false })
  username: string;

  @Column({unique:true , nullable: false})
  email: string;

  @Column({nullable:false})
  password: string;  

  @ManyToMany(() => Chat, (chat) => chat.participants)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Chat, (chat) => chat.owner)
  ownedChats: Chat[];
}
