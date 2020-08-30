import server from './server';

const uri = 'mongodb://admin:xxx111@localhost:27017/admin';
const dbName = 'region';
const port = 3000;

server(uri, dbName).listen(port);
