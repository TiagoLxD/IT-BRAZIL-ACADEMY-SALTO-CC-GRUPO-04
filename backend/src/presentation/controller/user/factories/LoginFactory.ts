import { PrismaClient } from "@prisma/client"
import { PrismaUserRepository } from "../../../../infra/module/User/repositories/PrismaUserRepository"
import { LogUserControllerDecorator } from "../../../decorator/LogUserControllerDecorator"
import { Controller } from "../../../protocols/Controller"
import { makeUserValidation } from "../validator/UserValidationFactory"
import { BcryptAdapter } from "../../../../infra/cryptography/bcrypt-adapter"
import { LoginUser } from "../../../../core/application/useClass/LoginUser"
import { LoginUserController } from "../../../../infra/module/User/controller/LoginUserController"
import { makeRequiredLoginValidation } from "../validator/RequireLoginValidation"

export const makeLoginController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter()
	const prismaClient = new PrismaClient()
	const prismaRepository = new PrismaUserRepository(prismaClient)
	const loginUser = new LoginUser(prismaRepository, bcryptAdapter)
	const controller = new LoginUserController(loginUser, makeRequiredLoginValidation(), makeUserValidation())
	return new LogUserControllerDecorator(controller)
}
