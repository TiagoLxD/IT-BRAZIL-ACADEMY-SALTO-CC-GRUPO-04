import { PrismaClient } from "@prisma/client"
import { Controller } from "../../../../presentation/protocols/Controller"
import { PrismaUserRepository } from "../repositories/PrismaUserRepository"
import { ListUser } from "../../../../core/application/useClass/User/ListUser"
import { ListUserFactory } from "../../../../presentation/controller/user/factories/ListUserFactory"

export const makeListUserController = (): Controller => {
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaUserRepository(prismaClient)
	const listUser = new ListUser(prismaRepository)
	const controller = new ListUserFactory(listUser)
	return controller
}
