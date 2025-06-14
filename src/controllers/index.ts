import { AddUserController } from "./user/create-user-controller";
import { GetUserController } from "./user/get-user-controller";
import { UpdateUserController } from "./user/update-user-controller";
import { CreateTaskController } from "./task/create-task-controller";
import { ReadTaskController } from "./task/read-tasks-controller";

const _controllers = {
  addUserController: AddUserController,
  updateUserController: UpdateUserController,
  getUserController: GetUserController,
  createTaskController: CreateTaskController,
  readTasksController: ReadTaskController
};

export type Controllers = {
  [K in keyof typeof _controllers]: InstanceType<(typeof _controllers)[K]>;
};

// Define the User Controllers type
export type UserControllers = {
  [K in keyof Controllers as K extends `${string}User${string}` ? K : never]: Controllers[K];
};

export type TaskControllers = {
  [K in keyof Controllers as K extends `${string}Task${string}` ? K : never]: Controllers[K];
}

export {
    AddUserController,
    UpdateUserController,
    GetUserController,
    CreateTaskController,
    ReadTaskController
}