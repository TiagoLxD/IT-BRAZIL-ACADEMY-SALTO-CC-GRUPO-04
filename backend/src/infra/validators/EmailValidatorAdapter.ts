import { EmailValidator } from '../../presentation/validation/protocols/EmailValidator';
import validator from 'validator';

export class EmailValidationAdapter implements EmailValidator {
  isValid(email: string): boolean {
		if (validator.isEmail(email)) {
			return true
		}
		return false
  }
}
