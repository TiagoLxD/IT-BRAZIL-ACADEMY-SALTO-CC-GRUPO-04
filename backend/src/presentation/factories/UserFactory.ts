import { PrismaClient } from "@prisma/client"
import { CreateUser } from "../../core/application/useClass/CreateUser"
import { CreateUserController } from "../../infra/module/User/controller/CreateUserController"
import { PrismaCreateUser } from "../../infra/module/User/repositories/PrismaCreateUser"
import { LogControllerDecorator } from "../decorator/LogControllerDecorator"
import { Controller } from "../protocols/Controller"
import { makeRequiredUserValidation } from "../controller/validator/RequireUserValidation"
import { makeUserValidation } from "../controller/validator/UserValidationFactory"

export const makeSignUpController = (): Controller => {
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaCreateUser(prismaClient)
	const createUser = new CreateUser(prismaRepository)
	const controller = new CreateUserController(createUser, makeRequiredUserValidation(), makeUserValidation())
	return new LogControllerDecorator(controller)
}
