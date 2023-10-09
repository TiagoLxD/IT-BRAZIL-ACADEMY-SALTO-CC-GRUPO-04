import { CreateUserRequest } from '../../infra/module/User/controller/CreateUserController';
import { Controller } from '../protocols/Controller'
import { HttpResponse } from '../protocols/Http'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
  ) {}

	async handle(request: any): Promise<HttpResponse> {
		const requestData = (): CreateUserRequest.Request => {
			return {
				data: request,
			};
		}
		console.log(requestData())
		const httpResponse = await this.controller.handle(requestData())
    return httpResponse
  }
}
