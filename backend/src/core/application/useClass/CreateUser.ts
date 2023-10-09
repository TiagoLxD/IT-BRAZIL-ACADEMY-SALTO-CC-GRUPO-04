import { User } from "../../domain/User";
import { UserRepositoryInterface } from "../../repositories/UserRepository";

export class CreateUser {
	constructor(private readonly userRepository: UserRepositoryInterface) { }

	async execute(data: User): Promise<void> {
		await this.userRepository.create(data)
	}
}
