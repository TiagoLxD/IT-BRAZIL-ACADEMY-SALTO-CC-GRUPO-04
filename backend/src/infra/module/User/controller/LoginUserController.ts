import { Validation } from "@/presentation/protocols/Validation";
import { badRequest, conflictError, ok, serverError, unauthorized } from "../../../../presentation/helpers/HttpHelper";
import { Controller } from "../../../../presentation/protocols/Controller";
import { HttpResponse } from "../../../../presentation/protocols/Http";
import { LoginInterface } from "../../../../core/repositories/UserRepository";
import { LoginUser } from "../../../../core/application/useClass/LoginUser";
import { UnauthorizedError } from "../../../../core/errors/UnauthorizedError";

export class LoginUserController implements Controller {
  constructor(
		private readonly loginUser: LoginUser,
		private readonly validationRequred: Validation,
		private readonly validation: Validation,
  ) {}

  async handle(request: LoginUserRequest.Request): Promise<HttpResponse> {
		try {
			const errorRequired = this.validationRequred.validate(request.login);
      if (errorRequired) {
        return badRequest(errorRequired);
			}
			const errorUser = this.validation.validate(request.login);
      if (errorUser) {
        return badRequest(errorUser);
			}
			const loginUser = await this.loginUser.execute(request.login)
			if (loginUser instanceof Error) {
				if (loginUser instanceof UnauthorizedError) {
					return unauthorized(loginUser);
				}
			}
			else {
				return ok(loginUser);
			}
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginUserRequest {
  export type Request = {
    login: LoginInterface
  };
}
