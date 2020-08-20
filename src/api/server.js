import Express from 'express';

const regions = [
  { id: 1, name: 'Тульская область' },
  { id: 2, name: 'Московская область' },
  { id: 3, name: 'Воронежская область' },
  { id: 4, name: 'Брянская область' },
];

const server = new Express();
server.get('/regions', (req, res) => res.json({ success: true, payload: regions }));
export default server;
