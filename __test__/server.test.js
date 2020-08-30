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

let mongoClient;
let app;

describe('requests', () => {
  beforeAll(async () => {
    expect.extend(matchers);

    const mongoServer = new MongoMemoryServer();
    const uri = await mongoServer.getUri();

    mongoClient = new MongoClient(uri, options);
    await mongoClient.connect();
    await mongoClient
      .db(dbName)
      .collection(collectionName)
      .insertMany([
        { name: 'Тульская область', districts: 'Тула' },
        { name: 'Московкасая область', districts: 'Москва' },
      ]);

    app = server(uri, dbName);
  });

  afterAll(() => {
    mongoClient.close();
  });

  it('GET /regions', async () => {
    try {
      const result = await request(app)
        .get('/regions');
      expect(result).toHaveHTTPStatus(200);
    } catch (e) {
      console.log(e);
    }
  });

  it('GET /region/:id', async () => {
    const { body } = await request(app)
      .post('/region')
      .send({ name: 'Воронежская область', districts: 'Воронеж' });
    const { _id: id } = body.payload;

    const result = await request(app)
      .get(`/region/${id}`);
    expect(result).toHaveHTTPStatus(200);

    const fail = await request(app)
      .get('/region/3');
    expect(fail).toHaveHTTPStatus(422);
  });

  it('POST /region', async () => {
    const result = await request(app)
      .post('/region')
      .send({ name: 'Воронежская область', districts: 'Воронеж' });
    expect(result).toHaveHTTPStatus(201);

    const fail = await request(app)
      .post('/region')
      .send({ name: '', districts: '' });
    expect(fail).toHaveHTTPStatus(422);
  });

  it('PUT /region/:id', async () => {
    const { body } = await request(app)
      .post('/region')
      .send({ name: 'Воронежская область', districts: 'Воронеж' });
    const { _id: id } = body.payload;

    const result = await request(app)
      .put(`/region/${id}`)
      .send({ name: 'Липетцкая область', districts: 'Липетцк' });
    expect(result).toHaveHTTPStatus(200);

    const fail = await request(app)
      .put(`/region/${id}`)
      .send({ name: '', districts: '' });
    expect(fail).toHaveHTTPStatus(422);
  });

  it('DELETE /region/:id', async () => {
    const { body } = await request(app)
      .post('/region')
      .send({ name: 'Воронежская область', districts: 'Воронеж' });
    const { _id: id } = body.payload;

    const result = await request(app)
      .delete(`/region/${id}`);
    expect(result).toHaveHTTPStatus(200);

    const fail = await request(app)
      .get('/region/1');
    expect(fail).toHaveHTTPStatus(422);
  });
});
