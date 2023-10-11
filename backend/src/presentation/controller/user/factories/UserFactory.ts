import { PrismaClient } from "@prisma/client"
import { CreateUser } from "../../../../core/application/useClass/CreateUser"
import { CreateUserController } from "../../../../infra/module/User/controller/CreateUserController"
import { PrismaUserRepository } from "../../../../infra/module/User/repositories/PrismaUserRepository"
import { Controller } from "../../../protocols/Controller"
import { makeRequiredUserValidation } from "../validator/RequireUserValidation"
import { makeUserValidation } from "../validator/UserValidationFactory"
import { BcryptAdapter } from "../../../../infra/cryptography/bcrypt-adapter"
import { LogLoginControllerDecorator } from "../../../../presentation/decorator/LogLoginControllerDecorator"

export const makeSignUpController = (): Controller => {
	const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaUserRepository(prismaClient)
	const createUser = new CreateUser(prismaRepository, bcryptAdapter)
	const controller = new CreateUserController(createUser, makeRequiredUserValidation(), makeUserValidation())
	return new LogLoginControllerDecorator(controller)
}
