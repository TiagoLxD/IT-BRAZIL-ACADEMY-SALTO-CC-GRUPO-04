import { Router } from "express"
import { adaptRoute } from "../../../../infra/adapters/AdapterRouter"
import { makeCreateMatchController } from "../controller/CreateMatchController"
import { makeListMatchController } from "../controller/ListMatchController"

export default (router: Router): void => {
	router.post('/match', adaptRoute(makeCreateMatchController()))
	router.get('/match', adaptRoute(makeListMatchController()))
}
