import { User } from "../../../domain/User";
import { UserRepositoryInterface } from "../../../repositories/UserRepository";

export class ListUser {
	constructor(
		private readonly userRepository: UserRepositoryInterface,
	) { }

	async execute(): Promise<User[]> {
		const listUser = await this.userRepository.list();

    if (!listUser[0]) {
      return listUser;
    }
    const userWithoutPasswords = listUser.map((user) => {
      const { password, ...data } = user;
      return data as User;
    });

    return userWithoutPasswords;
	}
}
