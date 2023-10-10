import { MissingParamError } from "@/core/errors/MissingParam"
import { RequiredFieldValidation } from "@/presentation/validation/validators/RequireFieldsValidation"
import { describe, it, expect } from "vitest"

const field = 'randomField'
const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'random' })
    expect(error).toEqual(new MissingParamError(field))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'random' })
    expect(error).toBeFalsy()
  })
})
