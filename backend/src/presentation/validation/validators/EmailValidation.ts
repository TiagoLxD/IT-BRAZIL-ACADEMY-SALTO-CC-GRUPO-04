import { Validation } from "../../../presentation/protocols/Validation";
import { EmailValidator } from "../protocols/EmailValidator";
import { InvalidParamError } from "../../../core/errors/InvalidParam";

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(
        this.fieldName + ' is not in the correct format',
      );
    }
  }
}
