import { CreateMatchRequest } from '../../controller/match/factories/CreateMatchFactory';
import { Controller } from '../../protocols/Controller'
import { HttpResponse } from '../../protocols/Http'

export class LogMatchControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
  ) {}

	async handle(request: any): Promise<HttpResponse> {
		const requestData = (): CreateMatchRequest.Request => {
			return {
				data: request,
			};
		}

		const httpResponse = await this.controller.handle(requestData())
    return httpResponse
  }
}
