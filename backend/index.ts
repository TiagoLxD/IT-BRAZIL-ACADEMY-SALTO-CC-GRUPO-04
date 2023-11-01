import { PrismaHelper } from './src/infra/database/prisma/PrismaHelper';

PrismaHelper.connect()
  .then(async () => {
    const { setupApp } = await import('./src/config/app')
		const app = await setupApp()
		app.listen(process.env.PORT || 5000, () => console.log(`Servidor rodando http://localhost:5000`));
  })
  .catch(console.error)
