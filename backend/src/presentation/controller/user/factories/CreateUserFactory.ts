import { Validation } from "@/presentation/protocols/Validation";
import { CreateUser } from "../../../../core/application/useClass/User/CreateUser";
import { User } from "../../../../core/domain/User";
import { badRequest, conflictError, create, serverError } from "../../../helpers/HttpHelper";
import { Controller } from "../../../protocols/Controller";
import { HttpResponse } from "../../../protocols/Http";
import { UniqueParamError } from "../../../../core/errors/UniqueParam";
import { CreateUserSchema } from "../../../../infra/module/User/schema/CreateUserSchema";

export class CreateUserFactory implements Controller {
  constructor(
		private readonly createUser: CreateUser,
		private readonly validationRequred: Validation,
		private readonly validation: Validation,
  ) {}

  async handle(request: CreateUserRequest.Request): Promise<HttpResponse> {
		try {
			const errorRequired = this.validationRequred.validate(request.data);
      if (errorRequired) {
        return badRequest(errorRequired);
			}
			const errorUser = this.validation.validate(request.data);
      if (errorUser) {
        return badRequest(errorUser);
			}
			const schema = new CreateUserSchema().isValid(request.data);
      if (schema instanceof Error) {
        return badRequest(schema);
      }
			const createUser = await this.createUser.execute(request.data)
			if (createUser instanceof Error) {
				if (createUser instanceof UniqueParamError) {
					return conflictError(createUser);
				}
			}
			else {
				return create(createUser);
			}
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateUserRequest {
  export type Request = {
    data: User;
  };
}
