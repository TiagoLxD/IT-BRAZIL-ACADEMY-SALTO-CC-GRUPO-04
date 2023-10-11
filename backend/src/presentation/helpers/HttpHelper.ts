import { ServerError } from "../../core/errors/ServerError";
import { UnauthorizedError } from "../../core/errors/UnauthorizedError";
import { HttpResponse } from "../protocols/Http";

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const create = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error?: Error): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(error.message),
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const conflictError = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
