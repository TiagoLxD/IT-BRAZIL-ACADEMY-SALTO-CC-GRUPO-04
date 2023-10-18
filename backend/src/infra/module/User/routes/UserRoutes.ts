import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeSignUpController } from "../controller/CreateUserController"
import { makeLoginController } from "../controller/CreateLoginController"
import { makeListUserController } from "../controller/ListUserController"

export default (router: Router): void => {
	router.post('/signup', adaptRoute(makeSignUpController()))
	router.post('/login', adaptRoute(makeLoginController()))
	router.get('/user', adaptRoute(makeListUserController()))
}
