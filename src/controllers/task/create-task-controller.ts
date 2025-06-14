import { HttpRequest, HttpResponse, IController } from "../../shared/controller-interface";
import { ITaskRepository } from "../repositories/task-repository-interface";
import { taskInsertSchema, Task } from "../../schemas/task";
import { InputParseError } from "../../schemas/errors/inputs";

export class CreateTaskController implements IController<Task> {
  public constructor(private taskRepository: ITaskRepository) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse<Task>> {
    const { data, error, success } = taskInsertSchema.safeParse(
      httpRequest.body
    );

    if (!success) {
      throw new InputParseError("Invalid data", { cause: error.flatten().fieldErrors });
    }

    const newTask = await this.taskRepository.createTask(data);

    return {
      statusCode: 201,
      body: newTask,
    };
  }
}