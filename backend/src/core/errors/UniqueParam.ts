export class UniqueParamError extends Error {
  constructor(paramName: string) {
    super(`Unique Error: ${paramName} already exists`);
    this.name = 'UniqueError';
  }
}
