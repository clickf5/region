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
          <div className="form-row align-items-end">
            <div className="form-group col-5">
              <label htmlFor="data">Данные:</label>
              <select className="form-control" id="data" name="data">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group col-1">
              <div className="btn-group btn-block" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success">+</button>
                <button type="button" className="btn btn-danger">-</button>
              </div>
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
          <div className="form-row">
            <div className="form-group col-6">
              <textarea className="form-control" rows="10" />
            </div>
            <div className="form-group col-6">
              <textarea className="form-control" rows="10" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <button type="button" className="btn btn-success">Копировать</button>
            </div>
            <div className="form-group col-6">
              <button type="button" className="btn btn-success">Копировать</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
);

export default App;
