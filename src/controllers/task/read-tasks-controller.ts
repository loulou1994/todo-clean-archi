import { HttpRequest, HttpResponse, IController } from "../../shared/controller-interface";
import { ITaskRepository } from "../repositories/task-repository-interface";
import { Task } from "../../schemas/task";

export class ReadTaskController implements IController<Task[]> {
  public constructor(private taskRepository: ITaskRepository) {}

  public async handle(_httpRequest: HttpRequest): Promise<HttpResponse<Task[]>> {
    const newTask = await this.taskRepository.readTasks(45454);

    console.log({...newTask})
    return {
      statusCode: 201,
      body: newTask,
    };
  }
}