export class UnauthorizedError extends Error {
  constructor(paramName?: string) {
    super(`${paramName} Unauthorized`);
    this.name = 'UnauthorizedError';
  }
}
