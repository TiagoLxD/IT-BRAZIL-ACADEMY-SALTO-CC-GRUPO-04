import { LoginUserRequest } from '../../infra/module/User/controller/LoginUserController';
import { Controller } from '../protocols/Controller'
import { HttpResponse } from '../protocols/Http'

export class LogLoginControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
  ) {}

	async handle(request: any): Promise<HttpResponse> {
		const requestData = (): LoginUserRequest.Request => {
			return {
				login: request,
			};
		}

		const httpResponse = await this.controller.handle(requestData())
    return httpResponse
  }
}
