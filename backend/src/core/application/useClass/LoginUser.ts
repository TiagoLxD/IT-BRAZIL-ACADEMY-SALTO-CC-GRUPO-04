import { LoginInterface, UserRepositoryInterface } from "../../repositories/UserRepository";
import { UnauthorizedError } from "../../../core/errors/UnauthorizedError";
import { HashComparer } from "../../../presentation/cryptography/hash-comparer";

export class LoginUser {
	constructor(
		private readonly userRepository: UserRepositoryInterface,
		private readonly hashComparer: HashComparer,
	) { }

	async execute(data: LoginInterface): Promise<void | Error> {
		const existEmail = await this.userRepository.findByEmail(data.email)
		if (existEmail) {
			const isValid = await this.hashComparer.compare(data.password, existEmail.password)
			if (isValid) {
				return undefined
			}
			else {
				return new UnauthorizedError('Email or password not found')
			}
		}
		else {
			return new UnauthorizedError('Email or password not found')
		}
	}
}
