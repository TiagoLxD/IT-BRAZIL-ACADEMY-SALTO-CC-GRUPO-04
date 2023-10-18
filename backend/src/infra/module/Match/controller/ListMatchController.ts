import { PrismaMatchRepository } from "../repositories/PrismaMatchRepository"
import { Controller } from "../../../../presentation/protocols/Controller"
import { PrismaClient } from "@prisma/client"
import { ListMatch } from "../../../../core/application/useClass/Match/ListMatch"
import { ListMatchFactory } from "../../../../presentation/controller/match/factories/ListMatchFactory"

export const makeListMatchController = (): Controller => {
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaMatchRepository(prismaClient)
	const listMatch = new ListMatch(prismaRepository)
	const controller = new ListMatchFactory(listMatch)
	return controller
}
