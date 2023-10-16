import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeSignUpController } from "../controller/CreateUserController"
import { makeLoginController } from "../controller/CreateLoginController"

export default (router: Router): void => {
	router.post('/signup', adaptRoute(makeSignUpController()))
	router.post('/login', adaptRoute(makeLoginController()))
}
