import { Router } from 'express';
import { ObjectID } from 'mongodb';

const router = Router();

// GET /regions
router.get('/regions', async (req, res) => {
  try {
    const result = await req.db
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
router.get('/region/:id', async (req, res) => {
  try {
    const result = await req.db
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
router.post('/region', async (req, res) => {
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
    return;
  }

  try {
    const { ops } = await req.db
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
router.delete('/region/:id', async (req, res) => {
  try {
    const { value } = await req.db
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
router.put('/region/:id', async (req, res) => {
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
    return;
  }

  try {
    const update = { $set: { name, districts } };
    const { value } = await req.db
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

export default router;
