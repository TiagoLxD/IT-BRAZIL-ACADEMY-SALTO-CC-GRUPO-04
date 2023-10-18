import { ListUser } from "../../../../core/application/useClass/User/ListUser";
import { noContent, ok, serverError } from "../../../helpers/HttpHelper";
import { Controller } from "../../../protocols/Controller";
import { HttpResponse } from "../../../protocols/Http";

export class ListUserFactory implements Controller {
  constructor(
		private readonly listUser: ListUser,
  ) {}

  async handle(): Promise<HttpResponse> {
		try {
			const existUser = await this.listUser.execute();
      if (!existUser[0]) {
        return noContent();
      }
      return ok(existUser);
    } catch (error) {
      return serverError(error);
    }
  }
}
