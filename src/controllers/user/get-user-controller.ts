import { HttpResponse, IController } from "../../shared/controller-interface";
import { IUserRepository } from "../repositories/user-repository-interface";
import { User } from "../../schemas/user";

export class GetUserController implements IController<User[]> {
  constructor(private userRepository: IUserRepository) {}
  
  public async handle(_): Promise<HttpResponse<User[]>> {
    const users = await this.userRepository.findUsers()

    return {
        statusCode: 200,
        body: users
    }
  }
}
