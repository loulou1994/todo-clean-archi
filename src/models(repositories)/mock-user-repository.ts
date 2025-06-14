import type { User, UserInsert } from "../schemas/user";
import { IUserRepository } from "../controllers/repositories/user-repository-interface";

export class MockUserRepository implements IUserRepository {
  findUsers: () => Promise<User[]>;
  private users: Array<User> = [];

  async createUser(user: UserInsert): Promise<User> {
    const userId = this.users.length;

    // this.users.push({
    //   ...user,
    //   id: userId,
    //   passwordHash: user.password,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    return this.users[this.users.length - 1];
  }
}
