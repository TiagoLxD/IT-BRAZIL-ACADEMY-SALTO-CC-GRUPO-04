import { adaptRoute } from '@/infra/adapters/AdapterRouter';
import { Controller } from '@/presentation/protocols/Controller';
import { Request, Response } from 'express';
import { describe, expect, it, vitest } from 'vitest';

describe('adaptRoute', () => {
  it('should correctly adapt the route with a successful response', async () => {
    const mockController: Controller = {
      handle: async () => ({
        statusCode: 200,
        body: { result: 'Success' },
      }),
    };

    const mockRequest = {} as Request;
    const mockResponse = {
      status: vitest.fn().mockReturnThis(),
      json: vitest.fn(),
    } as unknown as Response;

    const adaptedRoute = adaptRoute(mockController);
    await adaptedRoute(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ result: 'Success' });
  });

  it('should correctly adapt the route with an error response', async () => {
    const mockController: Controller = {
      handle: async () => ({
        statusCode: 400,
        body: { message: 'Bad Request' },
      }),
    };

    const mockRequest = {} as Request;
    const mockResponse = {
      status: vitest.fn().mockReturnThis(),
      json: vitest.fn(),
    } as unknown as Response;

    const adaptedRoute = adaptRoute(mockController);
    await adaptedRoute(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad Request' });
  });
});
