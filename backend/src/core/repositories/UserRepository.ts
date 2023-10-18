import { User, UserInterface } from "../domain/User";

export interface LoginInterface {
	email: string;
	password: string;
}

export interface UserRepositoryInterface {
	create(data: User): Promise<void>
	findByEmail(email: string): Promise<UserInterface | undefined>
	findByNick(email: string): Promise<UserInterface | undefined>
	loadByEmail(email: string, password: string): Promise<UserInterface | undefined>
	list(): Promise<User[]>
}
