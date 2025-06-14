import { Repository } from "typeorm";

import { IUserRepository } from "../controllers/repositories/user-repository-interface";
import type { User, UserInsert } from "../schemas/user";
import { User as UserTypeOrm } from "../../typeorm/models/user";
import { BaseRepository } from "./base-repository";

export class UserRepository
  extends BaseRepository<UserTypeOrm>
  implements IUserRepository
{
  constructor(protected repository: Repository<UserTypeOrm>) {
    super(repository);
  }

  public async createUser(user: UserInsert): Promise<User> {
    return this.executeQuery(async () => {
      const newUser = this.repository.create({
        username: user.username,
        email: user.email,
        passwordHash: user.password,
      });

      await this.repository.save(newUser);

      return newUser;
    });
  }

  public async findUsers(): Promise<User[]> {
    return this.executeQuery(async () => {
      const allUsers = await this.repository.find();

      return allUsers;
    })
  }
}
