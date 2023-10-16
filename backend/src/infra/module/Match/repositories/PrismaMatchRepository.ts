import { Match } from "../../../../core/domain/Match";
import { MatchRepositoryInterface } from "../../../../core/repositories/MatchRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaMatchRepository implements MatchRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {}
	async create(data: Match): Promise<void> {
		console.log(data)
		await this.prisma.match.create({
			data: {
				name: data.name,
				betValue: data.betValue,
				user: {
					connect: {
						id: data.user.id
					}
				}
			}
		})
	}
}
