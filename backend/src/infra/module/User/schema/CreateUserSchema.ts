import { User } from '../../../../core/domain/User';
import { InvalidParamError } from '../../../../core/errors/InvalidParam';
import Joi from 'joi';

export class CreateUserSchema {
	isValid(data: User): Error {

		const createUserSchema = Joi.object({
			id: Joi.string().optional(),
      name: Joi.string().required(),
      nick: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }).required();

    const { error } = createUserSchema.validate(data);

    if (error) {
      return new InvalidParamError(error.details[0].message);
		}

		return undefined;
  }
}
