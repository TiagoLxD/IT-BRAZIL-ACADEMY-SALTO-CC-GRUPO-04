import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeCreateMatchController } from "../controller/CreateMatchController"

export default (router: Router): void => {
	router.post('/match', adaptRoute(makeCreateMatchController()))
}
