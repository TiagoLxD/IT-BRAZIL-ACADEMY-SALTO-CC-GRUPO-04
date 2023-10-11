import { EmailValidationAdapter } from "../../../../infra/validators/EmailValidatorAdapter";
import { Validation } from "../../../protocols/Validation";
import { ValidationComposite } from "../../../protocols/ValidationComposite";
import { EmailValidation } from "../../../validation/validators/EmailValidation";

export const makeUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));
  return new ValidationComposite(validations);
};
