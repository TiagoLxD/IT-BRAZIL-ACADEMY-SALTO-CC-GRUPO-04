import { CreateUserRequest } from '../../controller/user/factories/CreateUserFactory';
import { Controller } from '../../protocols/Controller'
import { HttpResponse } from '../../protocols/Http'

export class LogUserControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
  ) {}

	async handle(request: any): Promise<HttpResponse> {
		const requestData = (): CreateUserRequest.Request => {
			return {
				data: request,
			};
		}

		const httpResponse = await this.controller.handle(requestData())
    return httpResponse
  }
}
