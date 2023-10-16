import { Match } from '../../../../core/domain/Match';
import { Validation } from '../../../protocols/Validation';
import { ValidationComposite } from '../../../protocols/ValidationComposite';
import { RequiredFieldValidation } from '../../../validation/validators/RequireFieldsValidation';

export const makeRequiredMatchValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  const arrayString: (keyof Match)[] = [
    'name',
		'betValue',
		'user',
  ];
  for (const field of arrayString) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
