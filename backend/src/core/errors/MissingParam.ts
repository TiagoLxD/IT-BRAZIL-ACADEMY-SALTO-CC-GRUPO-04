export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName} must be mentioned`);
    this.name = 'MissingParamError';
  }
}
