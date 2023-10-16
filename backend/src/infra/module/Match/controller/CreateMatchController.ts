import { CreateMatch } from "../../../../core/application/useClass/Match/CreateMatch"
import { CreateMatchFactory } from "../../../../presentation/controller/match/factories/CreateMatchFactory"
import { PrismaMatchRepository } from "../repositories/PrismaMatchRepository"
import { Controller } from "../../../../presentation/protocols/Controller"
import { PrismaClient } from "@prisma/client"
import { makeRequiredMatchValidation } from "../../../../presentation/controller/match/validator/RequireMatchValidation"
import { LogMatchControllerDecorator } from "../../../../presentation/decorator/match/LogMatchControllerDecorator"

export const makeCreateMatchController = (): Controller => {
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaMatchRepository(prismaClient)
	const createUser = new CreateMatch(prismaRepository)
	const controller = new CreateMatchFactory(createUser, makeRequiredMatchValidation())
	return new LogMatchControllerDecorator(controller)
}
