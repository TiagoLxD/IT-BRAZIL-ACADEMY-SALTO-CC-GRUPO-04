import { User, UserInterface } from "@/core/domain/User";
import { UserRepositoryInterface } from "@/core/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaCreateUser implements UserRepositoryInterface{
	constructor(private readonly prisma: PrismaClient) {}
	findByNick(nick: string): Promise<UserInterface | undefined> {
		return this.prisma.user.findUnique({
			where: {
				nick
			}
		})
	}

	async findByEmail(email: string): Promise<UserInterface | undefined> {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(data: User): Promise<void> {
		await this.prisma.user.create({
			data: {
				email: data.email,
				nick: data.nick,
				name: data.name,
				password: data.password
			}
		})
	}
}
