import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeSignUpController } from "../../../../presentation/controller/user/factories/UserFactory"
import { makeLoginController } from "../../../../presentation/controller/user/factories/LoginFactory"

export default (router: Router): void => {
	router.post('/signup', adaptRoute(makeSignUpController()))
	router.post('/login', adaptRoute(makeLoginController()))
}
