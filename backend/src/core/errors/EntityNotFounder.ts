export class EntityNotFound extends Error {
  constructor(paramName: string) {
    super(`Entity ${paramName} not found`);
    this.name = 'EntityNotFound';
  }
}
