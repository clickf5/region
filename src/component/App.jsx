import React from 'react';

const App = () => (
  <>
    <div className="row">
      <div className="col">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">Region</a>
        </nav>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <form>
          <div className="form-row">
            <div className="form-group col-4">
              <label htmlFor="data">Данные:</label>
              <select className="form-control" id="data">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group col-2">
              <label htmlFor="salon_id">ID салона:</label>
              <input type="text" className="form-control" id="salon_id" />
            </div>
            <div className="form-group col-2">
              <label htmlFor="delimeter">Разделитель:</label>
              <input type="text" className="form-control" id="delimeter" />
            </div>
            <div className="form-group col-2">
              <label htmlFor="sort_from">Сортировка начиная с:</label>
              <input type="text" className="form-control" id="sort_from" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="truncate" value="option1" />
                <label className="form-check-label" htmlFor="truncate">Добавить TRUNCATE</label>
              </div>
            </div>
            <div className="form-group col-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="truncate" value="option1" />
                <label className="form-check-label" htmlFor="truncate">Отключить проверку связанных ключей</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <textarea className="form-control" rows="10" />
      </div>
      <div className="col">
        <textarea className="form-control" rows="10" />
      </div>
    </div>
  </>
);

export default App;
