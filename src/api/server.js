import Express from 'express';
import { ObjectID } from 'mongodb';

const server = new Express();

server.use(Express.json());

export default (database) => {
  // GET /regions
  server.get('/regions', async (req, res) => {
    try {
      const result = await database
        .collection('regions')
        .find()
        .toArray();
      res.json({ success: true, payload: result });
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  // GET /region/:id
  server.get('/region/:id', async (req, res) => {
    try {
      const result = await database
        .collection('regions')
        .findOne({ _id: new ObjectID(req.params.id) });
        // .findOne(new ObjectID(req.params.id));
      res.json({ success: true, payload: result });
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  // POST /region
  server.post('/region', async (req, res) => {
    const { name, districts } = req.body;

    const errors = {};

    if (name === undefined || name === '') {
      errors.name = "name cant't be blank";
    }

    if (districts === undefined || districts === '') {
      errors.districts = "districts cant't be blank";
    }

    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.json({ success: false, errors });
    }

    try {
      const { ops } = await database
        .collection('regions')
        .insertOne({ name, districts });
      res.status(201);
      res.json({ success: true, payload: ops[0] });
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  // DELETE /region/:id
  server.delete('/region/:id', async (req, res) => {
    try {
      const { value } = await database
        .collection('regions')
        .findOneAndDelete({ _id: new ObjectID(req.params.id) });

      if (value === null) {
        throw new Error(`Document with _id: ${req.params.id} not found`);
      }

      res.json({ success: true, payload: value });
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  // PUT /region/:id
  server.put('/region/:id', async (req, res) => {
    const { name, districts } = req.body;

    const errors = {};

    if (name === undefined || name === '') {
      errors.name = "name cant't be blank";
    }

    if (districts === undefined || districts === '') {
      errors.districts = "districts cant't be blank";
    }

    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.json({ success: false, errors });
    }

    try {
      const update = { $set: { name, districts } };
      const { value } = await database
        .collection('regions')
        .findOneAndUpdate({ _id: new ObjectID(req.params.id) }, update);

      if (value === null) {
        throw new Error(`Document with _id: ${req.params.id} not found`);
      }

      res.json({ success: true, payload: value });
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  return server;
};
