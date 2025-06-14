import { HttpRequest, IController } from "../../shared/controller-interface";
import { IUserRepository } from "../repositories/user-repository-interface";

export class UpdateUserController implements IController {
  constructor(private userRepository: IUserRepository) {}

  async handle(_: HttpRequest) {
    return {
      headers: {},
      statusCode: 200,
    };
  }
}
