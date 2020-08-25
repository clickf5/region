import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import server from '../src/api/server';

describe('requests', () => {
  beforeAll(() => {
    expect.extend(matchers);
  });

  it('GET /regions', async () => {
    const res = await request(server)
      .get('/regions');
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET /region/:id', async () => {
    const res = await request(server)
      .get('/region/1');
    expect(res).toHaveHTTPStatus(200);

    const fail = await request(server)
      .get('/region/3');
    expect(fail).toHaveHTTPStatus(422);
  });

  it('POST /region', async () => {
    const res = await request(server)
      .post('/region')
      .send({ name: 'Воронежская область', districts: 'Воронеж' });
    expect(res).toHaveHTTPStatus(201);

    const fail = await request(server)
      .post('/region')
      .send({ name: '', districts: '' });
    expect(fail).toHaveHTTPStatus(422);
  });

  it('PUT /region/:id', async () => {
    const res = await request(server)
      .put('/region/1')
      .send({ name: 'Липетцкая область', districts: 'Липетцк' });
    expect(res).toHaveHTTPStatus(200);

    const fail = await request(server)
      .put('/region/1')
      .send({ name: '', districts: '' });
    expect(fail).toHaveHTTPStatus(422);
  });

  it('DELETE /region/:id', async () => {
    const res = await request(server)
      .delete('/region/1');
    expect(res).toHaveHTTPStatus(200);

    const fail = await request(server)
      .get('/region/1');
    expect(fail).toHaveHTTPStatus(422);
  });
});
