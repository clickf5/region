import Express from 'express';

const regions = [
  { id: 1, name: 'Тульская область' },
  { id: 2, name: 'Московская область' },
];

const server = new Express();
server.get('/regions', (req, res) => res.json(regions));
export default server;
