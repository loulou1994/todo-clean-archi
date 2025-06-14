import { Repository } from "typeorm";

import {
  ITaskRepository,
  TaskQuery,
} from "../controllers/repositories/task-repository-interface";
import type {
  Task,
  TaskInsert,
  TaskPriority,
  TaskStatus,
} from "../schemas/task";
import { Task as TaskTypeOrm } from "../../typeorm/models/task";
import { BaseRepository } from "./base-repository";

export class TaskRepository
  extends BaseRepository<TaskTypeOrm>
  implements ITaskRepository
{
  constructor(protected repository: Repository<TaskTypeOrm>) {
    super(repository);
  }

  public async createTask(task: TaskInsert): Promise<Task> {
    return this.executeQuery(async () => {
      const newTask = this.repository.create({
        ...task,
        status: task.status as TaskStatus,
        priority: task.priority as TaskPriority,
      });

      await this.repository.save(newTask);

      return {
        ...newTask,
        userId: newTask.user.id,
        categoryId: newTask.category.id,
      };
    });
  }

  public async readTasks(
    _userId: number,
    _taskQuery?: TaskQuery
  ): Promise<Task[]> {
    // const pageSize = taskQuery.page || 20;
    // const page = taskQuery.pageSize || 0;

    return this.executeQuery(async () => {
      const tasks = await this.repository
        .createQueryBuilder("tasks")
        .leftJoinAndSelect("task.user", "user")
        .select("task")
        .addSelect("user.id", "userId")
        .where("task.userId = :userId", { _userId })
        .getMany();

      return tasks as unknown as Task[];
      //   {
      //   where: {
      //     user: {
      //       id: _userId,
      //     },
      //   },
      //   relations: {
      //     user: true,
      //   },
      //   select: {
      //     user: {
      //       id: true,
      //     },
      //   },
      //   take: pageSize,
      //   skip: page * pageSize,
      // }
    });
    // const allTasks = await this.client.find(TaskTypeOrm);
    // return allTasks;
  }

  public async updateTask(task: Task): Promise<Task> {
    return task;
  }

  public async deleteTask(_userId: number): Promise<void> {
    return;
  }
}
