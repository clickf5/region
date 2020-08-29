import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

import server from '../src/api/server';

const dbName = 'region';
const collectionName = 'regions';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let uri;
let mongoClient;

describe('requests', () => {
  beforeAll(async () => {
    expect.extend(matchers);

    const mongoServer = new MongoMemoryServer();
    uri = await mongoServer.getUri();

    mongoClient = new MongoClient(uri, options);
    await mongoClient.connect();
    await mongoClient
      .db(dbName)
      .collection(collectionName)
      .insertMany([
        { name: 'Тульская область', districts: 'Тула' },
        { name: 'Московкасая область', districts: 'Москва' },
      ]);
  });

  afterEach(() => {
    mongoClient.close();
  });

  it('GET /regions', async () => {
    try {
      const result = await request(server(uri, dbName))
        .get('/regions');
      expect(result).toHaveHTTPStatus(200);
    } catch (e) {
      console.log(e);
    }
  });

  // it('GET /region/:id', async () => {
  //   const res = await request(server(database))
  //     .get('/region/1');
  //   expect(res).toHaveHTTPStatus(200);

  //   const fail = await request(server(database))
  //     .get('/region/3');
  //   expect(fail).toHaveHTTPStatus(422);
  // });

  // it('POST /region', async () => {
  //   const res = await request(server(database))
  //     .post('/region')
  //     .send({ name: 'Воронежская область', districts: 'Воронеж' });
  //   expect(res).toHaveHTTPStatus(201);

  //   const fail = await request(server(database))
  //     .post('/region')
  //     .send({ name: '', districts: '' });
  //   expect(fail).toHaveHTTPStatus(422);
  // });

  // it('PUT /region/:id', async () => {
  //   const res = await request(server(database))
  //     .put('/region/1')
  //     .send({ name: 'Липетцкая область', districts: 'Липетцк' });
  //   expect(res).toHaveHTTPStatus(200);

  //   const fail = await request(server(database))
  //     .put('/region/1')
  //     .send({ name: '', districts: '' });
  //   expect(fail).toHaveHTTPStatus(422);
  // });

  // it('DELETE /region/:id', async () => {
  //   const res = await request(server(database))
  //     .delete('/region/1');
  //   expect(res).toHaveHTTPStatus(200);

  //   const fail = await request(server(database))
  //     .get('/region/1');
  //   expect(fail).toHaveHTTPStatus(422);
  // });
});
