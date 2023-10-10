import { UniqueParamError } from "../../../core/errors/UniqueParam";
import { User } from "../../domain/User";
import { UserRepositoryInterface } from "../../repositories/UserRepository";

export class CreateUser {
	constructor(private readonly userRepository: UserRepositoryInterface) { }

	async execute(data: User): Promise<void | Error> {
		const existEmail = await this.userRepository.findByEmail(data.email)

		if (existEmail) {
			return new UniqueParamError('Email')
		}

		const existNick = await this.userRepository.findByNick(data.nick)

		if (existNick) {
			return new UniqueParamError('Nick')
		}

		await this.userRepository.create(data)
	}
}
