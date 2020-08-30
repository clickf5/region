import Express from 'express';
import mongodb from './db';
import routes from './routes';

const server = new Express();

export default (uri, dbName) => {
  server.use(Express.json());
  server.use(mongodb(uri, dbName));
  server.use(routes);
  return server;
};
