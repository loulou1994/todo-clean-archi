// import { AppDataSource } from "../typeorm/data-source";
// import { User } from "../typeorm/models/user";
// import { Task } from "../typeorm/models/task";
// import { ExpressApp } from "./web-frameworks/express";
// import { UserRepository, TaskRepository } from "./models(repositories)";
// import {
//   AddUserController,
//   UpdateUserController,
//   GetUserController,
//   CreateTaskController,
//   ReadTaskController,
// } from "./controllers"

// const app = ExpressApp.getInstance;
// const PORT = (process.env.PORT as unknown as number | undefined) || 5000;

// const userRepository = new UserRepository(AppDataSource.getRepository(User));
// const taskRepository = new TaskRepository(AppDataSource.getRepository(Task));

// const addUserController = new AddUserController(userRepository);
// const updateUserController = new UpdateUserController(userRepository);
// const getUserController = new GetUserController(userRepository);
// const createTaskController = new CreateTaskController(taskRepository);
// const readTasksController = new ReadTaskController(taskRepository);

// AppDataSource.initialize()
//   .then(async () => {
//     app.runServer(PORT, {
//       addUserController,
//       updateUserController,
//       getUserController,
//       createTaskController,
//       readTasksController,
//     });
//   })
//   .catch((error) => console.log(error));