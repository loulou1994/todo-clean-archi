import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { User } from "./user";
import { Category } from "./category";

// type TaskStatus = "pending" | "in-progress" | "completed";

enum TaskStatus {
  PENDING = "pending",
  INPROGRESS = "in-progress",
  COMPLETED = "completed",
}

enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
};

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 30,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 75,
    nullable: true
  })
  description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @Column({
    type: "enum",
    enum: TaskPriority,
    default: TaskPriority.MEDIUM
  })
  priority: TaskPriority

  @Column({
    type: "timestamp",
    nullable: true
  })
  dueDate: Date

  @ManyToOne(() => User, (user) => user.tasks)
  user: User

  @ManyToOne(() => Category, (category) => category.task)
  category: Category

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
