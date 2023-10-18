import { Match } from "../../../../core/domain/Match";
import { MatchList, MatchRepositoryInterface } from "../../../../core/repositories/MatchRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaMatchRepository implements MatchRepositoryInterface {
	constructor(private readonly prisma: PrismaClient) {}
	async list(): Promise<MatchList[]> {
		const match = await this.prisma.match.findMany()
		return match.map((data) => ({
    	id: data.id,
    	betValue: data.betValue,
    	name: data.name,
			user: {
      	id: data.id_user,
    	},
  	}));
	}

	async create(data: Match): Promise<void> {
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
