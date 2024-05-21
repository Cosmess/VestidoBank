import Fastify from 'fastify';
import { sequelize } from './infrastructure/database/sequelize';
import { userRoutes } from './interface/routes/userRoutes';
import { transferRoutes } from './interface/routes/transferRoutes';

const startServer = async () => {
  const fastify = Fastify({ logger: true });

  try {
    //await sequelize.sync();
    await sequelize.sync({ force: true });

    console.log('Database synchronized');

    await fastify.register(userRoutes);
    await fastify.register(transferRoutes);

    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
