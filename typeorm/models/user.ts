import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from "typeorm";

import { Task } from "./task";
import { Category } from "./category";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 60,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 60,
  })
  passwordHash: string;

  @Column({
    type: "varchar",
    length: 30
  })
  image: string

  @OneToMany(() => Category, (category) => category.user)
  category: Category[]

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
