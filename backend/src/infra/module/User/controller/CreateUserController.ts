import { CreateUser } from "../../../../core/application/useClass/CreateUser";
import { User, UserInterface } from "../../../../core/domain/User";
import { create, serverError } from "../../../../presentation/helpers/HttpHelper";
import { Controller } from "../../../../presentation/protocols/Controller";
import { HttpResponse } from "../../../../presentation/protocols/Http";

export class CreateUserController implements Controller {
  constructor(
    private readonly createUser: CreateUser,
  ) {}

  async handle(request: CreateUserRequest.Request): Promise<HttpResponse> {
		try {
      return create(await this.createUser.execute(request.data));
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
