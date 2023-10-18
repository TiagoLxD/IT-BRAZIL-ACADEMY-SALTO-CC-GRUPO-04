import { CreateMatchSchema } from "../../../../infra/module/Match/schema/CreateMatchSchema";
import { CreateMatch } from "../../../../core/application/useClass/Match/CreateMatch";
import { Match } from "../../../../core/domain/Match";
import { badRequest, create, serverError } from "../../../helpers/HttpHelper";
import { Controller } from "../../../protocols/Controller";
import { HttpResponse } from "../../../protocols/Http";
import { Validation } from "../../../protocols/Validation";

export class CreateMatchFactory implements Controller {
  constructor(
		private readonly createMatch: CreateMatch,
		private readonly validationRequred: Validation,
  ) {}

  async handle(request: CreateMatchRequest.Request): Promise<HttpResponse> {
		try {
			const errorRequired = this.validationRequred.validate(request.data);
      if (errorRequired) {
        return badRequest(errorRequired);
			}
			const schema = new CreateMatchSchema().isValid(request.data);
      if (schema instanceof Error) {
        return badRequest(schema);
      }
			const createMatch = await this.createMatch.execute(request.data)
			return create(createMatch);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateMatchRequest {
  export type Request = {
    data: Match;
  };
}
