import { ListMatch } from "../../../../core/application/useClass/Match/ListMatch";
import { Match } from "../../../../core/domain/Match";
import { noContent, ok, serverError } from "../../../helpers/HttpHelper";
import { Controller } from "../../../protocols/Controller";
import { HttpResponse } from "../../../protocols/Http";

export class ListMatchFactory implements Controller {
  constructor(
		private readonly listMatch: ListMatch,
  ) {}

  async handle(): Promise<HttpResponse> {
		try {
			const existMatch = await this.listMatch.execute();
      if (!existMatch[0]) {
        return noContent();
      }
      return ok(existMatch);
    } catch (error) {
      return serverError(error);
    }
  }
}
