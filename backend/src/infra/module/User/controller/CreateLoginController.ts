import { PrismaClient } from "@prisma/client"
import { PrismaUserRepository } from "../repositories/PrismaUserRepository"
import { Controller } from "../../../../presentation/protocols/Controller"
import { makeUserValidation } from "../../../../presentation/controller/user/validator/UserValidationFactory"
import { BcryptAdapter } from "../../../cryptography/bcrypt-adapter"
import { LoginUser } from "../../../../core/application/useClass/User/LoginUser"
import { LoginUserFactory } from "../../../../presentation/controller/user/factories/LoginFactory"
import { makeRequiredLoginValidation } from "../../../../presentation/controller/user/validator/RequireLoginValidation"
import { LogLoginControllerDecorator } from "../../../../presentation/decorator/user/LogLoginControllerDecorator"

export const makeLoginController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter()
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaUserRepository(prismaClient)
	const loginUser = new LoginUser(prismaRepository, bcryptAdapter)
	const controller = new LoginUserFactory(loginUser, makeRequiredLoginValidation(), makeUserValidation())
	return new LogLoginControllerDecorator(controller)
}
