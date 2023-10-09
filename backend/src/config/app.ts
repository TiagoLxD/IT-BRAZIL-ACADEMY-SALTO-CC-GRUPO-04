/* eslint-disable no-unused-vars */
import express, { Express } from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

export const setupApp = async (): Promise<Express> => {
	const app = express();
	app.disable("x-powered-by");
	setupMiddlewares(app)
	setupRoutes(app)
	return app
}
