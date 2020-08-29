import { MongoClient } from 'mongodb';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default (uri, dbName) => {
  const client = new MongoClient(uri, options);

  return async (req, res, next) => {
    try {
      if (!client.isConnected()) {
        await client.connect();
      }

      req.db = await client.db(dbName);
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
};
