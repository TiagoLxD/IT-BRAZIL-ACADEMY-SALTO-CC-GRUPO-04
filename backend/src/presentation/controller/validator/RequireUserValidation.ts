import { User } from '../../../core/domain/User';
import { Validation } from '../../../presentation/protocols/Validation';
import { ValidationComposite } from '../../../presentation/protocols/ValidationComposite';
import { RequiredFieldValidation } from '../../../presentation/validation/validators/RequireFieldsValidation';

export const makeRequiredUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const arrayString: (keyof User)[] = [
    'name',
		'email',
		'nick',
		'password'
  ];
  for (const field of arrayString) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
