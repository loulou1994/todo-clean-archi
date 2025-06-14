import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { User } from "./user";
import { Task } from "./task";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: "20"
  })
  name: string

  @ManyToOne(() => User, (user) => user.category)
  user: User

  @OneToMany(() => Task, (task) => task.category)
  task: Task[]
  
  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
