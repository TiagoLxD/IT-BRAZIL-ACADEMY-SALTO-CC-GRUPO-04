import { InvalidParamError } from '../../../../core/errors/InvalidParam';
import { Match } from '../../../../core/domain/Match';
import Joi from 'joi';

export class CreateMatchSchema {
	isValid(data: Match): Error {
		const createMatchSchema = Joi.object({
			id: Joi.string().optional(),
      name: Joi.string().required(),
      betValue: Joi.number().positive().required(),
      user: Joi.object({ id: Joi.string().required() }).required()
    }).required();

    const { error } = createMatchSchema.validate(data);

    if (error) {
      return new InvalidParamError(error.details[0].message);
		}

		return undefined;
  }
}
