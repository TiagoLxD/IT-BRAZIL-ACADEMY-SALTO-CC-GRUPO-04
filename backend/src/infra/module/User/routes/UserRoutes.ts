import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeSignUpController } from "../../../../presentation/factories/UserFactory"

export default (router: Router): void => {
	console.log("passou no signup")
	router.post('/signup', adaptRoute(makeSignUpController()))
}
