import express from 'express'
import fs from 'fs'
import path from 'path'

export default (app: express.Express): void => {
	const router = express.Router();

	app.use('/truco', router)

	const modulesPath = path.join(__dirname, '../../src/infra/module');
	const modules = fs.readdirSync(modulesPath);

	modules.forEach(moduleName => {
		const moduleRoutesPath = path.join(modulesPath, moduleName, 'routes');

		if (fs.existsSync(moduleRoutesPath) && fs.lstatSync(moduleRoutesPath).isDirectory()) {
			const moduleRoutesFiles = fs.readdirSync(moduleRoutesPath);

			moduleRoutesFiles.forEach(async file => {
				if (!file.endsWith('.map')) {
					const routeModule = await import(path.join(moduleRoutesPath, file));

					if (routeModule.default && typeof routeModule.default === 'function') {
						routeModule.default(router);
					}
				}
			});
		}
	});
}


