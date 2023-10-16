import { PrismaClient } from "@prisma/client"
import { CreateUser } from "../../../../core/application/useClass/User/CreateUser"
import { CreateUserFactory } from "../../../../presentation/controller/user/factories/CreateUserFactory"
import { PrismaUserRepository } from "../repositories/PrismaUserRepository"
import { Controller } from "../../../../presentation/protocols/Controller"
import { makeRequiredUserValidation } from "../../../../presentation/controller/user/validator/RequireUserValidation"
import { makeUserValidation } from "../../../../presentation/controller/user/validator/UserValidationFactory"
import { BcryptAdapter } from "../../../cryptography/bcrypt-adapter"
import { LogUserControllerDecorator } from "../../../../presentation/decorator/user/LogUserControllerDecorator"

export const makeSignUpController = (): Controller => {
	const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaUserRepository(prismaClient)
	const createUser = new CreateUser(prismaRepository, bcryptAdapter)
	const controller = new CreateUserFactory(createUser, makeRequiredUserValidation(), makeUserValidation())
	return new LogUserControllerDecorator(controller)
}
