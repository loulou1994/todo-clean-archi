import { UserInsert, User } from "../../schemas/user"; 

export interface IUserRepository {
  createUser: (user: UserInsert) => Promise<User>;
  findUsers: () => Promise<User[]>
}