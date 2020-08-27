import { MongoClient } from 'mongodb';
import server from './server';

const uri = 'mongodb://admin:xxx111@localhost:27017/admin';
const dbName = 'region';
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const getDb = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }

  const db = client.db(dbName);
  return db;
};

getDb().then((db) => {
  server(db).listen(3000);
});
