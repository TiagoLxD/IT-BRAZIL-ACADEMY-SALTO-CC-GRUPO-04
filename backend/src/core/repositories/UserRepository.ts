import { User } from "../domain/User";

export interface UserRepositoryInterface {
	create(data: User): Promise<void>
}
