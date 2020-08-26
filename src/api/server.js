import Express from 'express';
import Region from './Region';

let regions = [
  new Region('Тульская область', 'Тула,Арсеньевский р-он,Белёвский р-он,Богородицкий р-он,Венёвский р-он,Воловский р-он,Дубенский р-он,Заокский р-он,Каменский р-он,Кимовский р-он,Киреевский р-он,Куркинский р-он,Одоевский р-он,Плавский р-он,Суворовский р-он,Тёпло-Огарёвский р-он,Узловский р-он,Чернский р-он,Щёкинский р-он,Ясногорский р-он,Калужская обл,Липецкая обл,Московская обл,Орловская обл,Рязанская обл'),
  new Region('Московская область', 'Москва,Волоколамский р-он,Воскресенский р-он,Дмитровский р-он,Клинский р-он,Ленинский р-он,Лотошинский р-он,Можайский р-он,Ногинский р-он,Одинцовский р-он,Орехово-Зуевский р-он,Пушкинский р-он,Раменский р-он,Сергиево-Посадский р-он,Серпуховский р-он,Солнечногорский р-он,Талдомский р-он,Щёлковский р-он,Владимирская обл,Калужская обл,Рязанская обл,Смоленская обл,Тверская обл,Тульская обл'),
];

const server = new Express();

server.use(Express.json());

export default (database) => {
  server.get('/regi', async (req, res) => {
    try {
      const result = await database.collection('regions').find().toArray();
      res.json(result);
    } catch (e) {
      res.status(422);
      res.json({ success: false, errors: { message: e.message } });
    }
  });

  server.get('/regions', (req, res) => res.json({ success: true, payload: regions }));

  server.get('/region/:id', (req, res) => {
    const region = regions.find(({ id }) => id.toString() === req.params.id);

    const errors = {};

    if (region === undefined) {
      errors.message = `Not found region with id: ${req.params.id}`;
    }

    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.json({ success: false, errors });
    }

    res.json({ success: true, payload: region });
  });

  server.post('/region', (req, res) => {
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

    const region = new Region(name, districts);
    regions.push(region);
    res.status(201);
    res.json({ success: true, payload: region });
  });

  server.delete('/region/:id', (req, res) => {
    const region = regions.find(({ id }) => id.toString() === req.params.id);

    const errors = {};

    if (region === undefined) {
      errors.message = `Not found region with id: ${req.params.id}`;
    }

    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.json({ success: false, errors });
    }

    regions = regions.filter(({ id }) => id !== region.id);
    res.json({ success: true });
  });

  server.put('/region/:id', (req, res) => {
    const { name, districts } = req.body;
    const region = regions.find(({ id }) => id.toString() === req.params.id);

    const errors = {};

    if (region === undefined) {
      errors.message = `Not found region with id: ${req.params.id}`;
    }

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

    const updated = { ...region, name, districts };
    regions = regions.map((r) => ((r.id === region.id) ? updated : r));
    res.json({ success: true, payload: updated });
  });

  return server;
};
