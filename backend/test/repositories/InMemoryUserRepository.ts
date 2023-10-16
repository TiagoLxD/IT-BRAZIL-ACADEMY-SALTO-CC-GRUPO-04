import { User, UserInterface } from "@/core/domain/User";
import { LoginInterface, UserRepositoryInterface } from "@/core/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepositoryInterface {

	items: User[] = [];
	findByEmail(email: string): Promise<UserInterface> {
		const result = this.items.filter((item) => item.email === email)
		if (result.length > 0) {
			return Promise.resolve(result[0]);
		}
		else {
			return Promise.resolve(undefined);
		}
	}
	findByNick(nick: string): Promise<UserInterface> {
		const result = this.items.filter((item) => item.nick === nick)
		if (result.length > 0) {
			return Promise.resolve(result[0]);
		}
		else {
			return Promise.resolve(undefined);
		}
	}
	loadByEmail(email: string, password: string): Promise<UserInterface> {
		const result = this.items.filter((item) => item.email === email && item.password === password)
		if (result.length > 0) {
			return Promise.resolve(result[0]);
		}
		else {
			return Promise.resolve(undefined);
		}
	}
	create(data: User): Promise<void> {
		this.items.push(data);
		return Promise.resolve();
	}
}
