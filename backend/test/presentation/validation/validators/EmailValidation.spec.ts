import { InvalidParamError } from "@/core/errors/InvalidParam"
import { EmailValidation } from "@/presentation/validation/validators/EmailValidation"
import { EmailValidatorSpy } from "@test/mock/mock-email-validator"
import { throwError } from "@test/mock/mock-test-helpers"
import { describe, it, expect, vitest } from "vitest"

const field = 'randomField'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = 'abner@abner.com'
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field + ' is not in the correct format'))
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = 'abner@gmail.com'
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    vitest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
