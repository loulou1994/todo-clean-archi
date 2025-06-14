import type {
  HttpRequest,
  HttpResponse,
  IController,
} from "../../shared/controller-interface";
import { IUserRepository } from "../repositories/user-repository-interface";
import { User, userInsertSchema } from "../../schemas/user";
import { InputParseError } from "../../schemas/errors/inputs";

export class AddUserController implements IController<User> {
  public constructor(private userRepository: IUserRepository) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse<User>> {
    const { data, error, success } = userInsertSchema.safeParse(
      httpRequest.body
    );

    if (!success) {
      throw new InputParseError("Invalid data", { cause: error.flatten().fieldErrors });
    }

    const user = await this.userRepository.createUser(data);

    return {
      statusCode: 201,
      body: user
    };
  }
}