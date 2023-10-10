import { User, UserInterface } from "../domain/User";

export interface UserRepositoryInterface {
	create(data: User): Promise<void>
	findByEmail(email: string): Promise<UserInterface | undefined>
	findByNick(email: string): Promise<UserInterface | undefined>
}
