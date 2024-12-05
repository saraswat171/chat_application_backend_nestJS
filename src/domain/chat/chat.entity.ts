import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({default:false})
  isGroupChat: boolean;

  @Column({ nullable:true })
  groupName: string;

  @ManyToOne(() => User, (user) => user.ownedChats)
  owner: User;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()  
  participants: User[];

  @OneToMany(() => Message, (message) => message.chat )
  messages: Promise<Message[]>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
