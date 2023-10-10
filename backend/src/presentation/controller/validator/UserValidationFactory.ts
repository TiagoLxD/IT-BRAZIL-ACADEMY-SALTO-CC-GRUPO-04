import { EmailValidationAdapter } from "../../../infra/validators/EmailValidatorAdapter";
import { Validation } from "../../../presentation/protocols/Validation";
import { ValidationComposite } from "../../../presentation/protocols/ValidationComposite";
import { EmailValidation } from "../../../presentation/validation/validators/EmailValidation";

export const makeUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  return new ValidationComposite(validations);
};
