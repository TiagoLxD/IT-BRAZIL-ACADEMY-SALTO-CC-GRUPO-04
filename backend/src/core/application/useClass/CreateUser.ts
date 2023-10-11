import { Hasher } from "../../../presentation/cryptography/hasher";
import { UniqueParamError } from "../../../core/errors/UniqueParam";
import { User } from "../../domain/User";
import { UserRepositoryInterface } from "../../repositories/UserRepository";
import { EntityNotFound } from "@/core/errors/EntityNotFounder";

export class CreateUser {
	constructor(
		private readonly userRepository: UserRepositoryInterface,
		private readonly hasher: Hasher
	) { }

	async execute(data: User): Promise<void | Error> {
		const existEmail = await this.userRepository.findByEmail(data.email)
		if (existEmail) {
			return new UniqueParamError('Email')
		}

		const existNick = await this.userRepository.findByNick(data.nick)
		if (existNick) {
			return new UniqueParamError('Nick')
		}

		const hashedPassword = await this.hasher.hash(data.password)

		await this.userRepository.create({
			...data,
			password: hashedPassword
		} as User)
	}
}
