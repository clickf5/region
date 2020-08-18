import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [
        { id: 1, name: 'Тульская область' },
        { id: 2, name: 'Московская область' },
      ],
      form: {
        region: 'Тульская область',
        salonId: '1',
        delimeter: ',',
        sortFrom: '0',
        useTruncate: false,
      },
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = (type === 'checkbox') ? target.checked : target.value;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  }

  renderRegionsSelect() {
    const { regions, form: { region } } = this.state;
    const options = regions.map(({ id, name }) => (
      <option key={id}>{name}</option>
    ));
    return (
      <select onChange={this.handleChange} className="form-control" id="region" value={region} name="region">
        {options}
      </select>
    );
  }

  render() {
    const { salonId, delimeter, sortFrom, useTruncate } = this.state.form;
    return (
      <form>
        <div className="form-row align-items-end">
          <div className="form-group col-5">
            <label htmlFor="regions">Данные:</label>
            {this.renderRegionsSelect()}
          </div>
          <div className="form-group col-1">
            <div className="btn-group btn-block" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-success">+</button>
              <button type="button" className="btn btn-danger">-</button>
            </div>
          </div>
          <div className="form-group col-2">
            <label htmlFor="salon-id">ID салона:</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="salon-id" name="salonId" value={salonId} />
          </div>
          <div className="form-group col-2">
            <label htmlFor="delimeter">Разделитель:</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="delimeter" name="delimeter" value={delimeter} />
          </div>
          <div className="form-group col-2">
            <label htmlFor="sort_from">Сортировка начиная с:</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="sort-from" name="sortFrom" value={sortFrom} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-2">
            <div className="form-check">
              <input onChange={this.handleChange} name="useTruncate" checked={useTruncate} className="form-check-input" type="checkbox" id="truncate" value="option1" />
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
    );
  }
}

export default Form;
