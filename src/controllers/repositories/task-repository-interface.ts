import { Task, TaskInsert } from "../../schemas/task";

export type TaskQuery = {
    page?: number,
    pageSize?: number;
}

export interface ITaskRepository {
    createTask: (taskInsert: TaskInsert) => Promise<Task>
    updateTask: (task: Task) => Promise<Task>
    deleteTask: (taskId: number) => Promise<void>
    readTasks: (userId: number, taskQuery?: TaskQuery) => Promise<Task[]>
}