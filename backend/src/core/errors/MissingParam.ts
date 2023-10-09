export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName} must be mentioned`);
    this.name = 'MissingParamError';
  }
}
