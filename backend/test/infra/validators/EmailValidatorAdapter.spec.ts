import { EmailValidationAdapter } from "@/infra/validators/EmailValidatorAdapter";
import { describe, it, expect } from "vitest";

describe('Test Validation Email with framework', () => {
	const email = new EmailValidationAdapter()
	it('test success', () => {
		const isEmail = email.isValid('abner@gmail.com')
		expect(isEmail).toBeTruthy()
	})

	it('test fail', () => {
		const isEmail = email.isValid('abner@abner')
		expect(isEmail).toBeFalsy()
	})
})
