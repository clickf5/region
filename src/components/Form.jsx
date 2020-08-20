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
        region: '1',
        regionData: 'Тула, Алексин',
        query: '',
        salonId: '1',
        delimeter: ',',
        sortFrom: '0',
        useTruncate: false,
        foreignKeysOff: false,
      },
    };
  }

  componentDidMount() {
    const { form } = this.state;

    this.setState({ form: { ...form, query: this.formQuery(form) } });
  }

  formQuery = (newFormState) => {
    const {
      regionData, salonId, useTruncate, foreignKeysOff, delimeter, sortFrom,
    } = newFormState;

    if (regionData === '') {
      return '';
    }

    const regions = regionData.split(delimeter);

    const getInsert = (name, index, salon) => {
      const order = index + Number(sortFrom);

      return `INSERT INTO \`clients_region\` (\`name\`, \`ord\`) VALUES ('${name.trim()}', ${order});\nSET @LAST_ID = LAST_INSERT_ID();\nINSERT INTO \`clients_regions_to_salons\`(\`salon_id\`, \`region_id\`, \`ord\`) VALUES (${salon}, @LAST_ID, ${order});\n`;
    };

    const keysOff = 'SET FOREIGN_KEY_CHECKS=0;\n';
    const keysOn = 'SET FOREIGN_KEY_CHECKS=1;';
    const truncateQuery = 'TRUNCATE `clients_region`;\nTRUNCATE `clients_regions_to_salons`;\n';
    const insertQueries = regions.map((region, index) => getInsert(region, index, salonId));
    const result = [...insertQueries];

    // TODO: need to think how to do in immutable style
    if (useTruncate) {
      result.unshift(truncateQuery);
    }
    if (foreignKeysOff) {
      result.unshift(keysOff);
      result.push(keysOn);
    }

    return result.join('\n');
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = (type === 'checkbox') ? target.checked : target.value;
    const { form } = this.state;
    const changedValueState = { ...form, [name]: value };
    const changedQueryState = { ...changedValueState, query: this.formQuery(changedValueState) };

    this.setState({ form: { ...changedQueryState } });
  }

  renderRegionsSelect() {
    const { regions, form: { region } } = this.state;
    const options = regions.map(({ id, name }) => (
      <option key={id} value={id}>{name}</option>
    ));
    return (
      <select onChange={this.handleChange} className="form-control" id="region" value={region} name="region">
        {options}
      </select>
    );
  }

  render() {
    const {
      form: {
        regionData,
        salonId,
        delimeter,
        sortFrom,
        useTruncate,
        foreignKeysOff,
        query,
      },
    } = this.state;
    return (
      <form>
        <div className="form-row align-items-end">
          <div className="form-group col-5">
            <label htmlFor="regions">Регион:</label>
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
              <input onChange={this.handleChange} name="useTruncate" checked={useTruncate} className="form-check-input" type="checkbox" id="truncate" />
              <label className="form-check-label" htmlFor="truncate">Добавить TRUNCATE</label>
            </div>
          </div>
          <div className="form-group col-4">
            <div className="form-check">
              <input onChange={this.handleChange} name="foreignKeysOff" checked={foreignKeysOff} className="form-check-input" type="checkbox" id="foreign-keys-off" />
              <label className="form-check-label" htmlFor="foreign-keys-off">Отключить проверку внешних ключей</label>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-6">
            <label className="form-check-label" htmlFor="region-data">Данные:</label>
            <textarea onChange={this.handleChange} className="form-control" rows="10" value={regionData} name="regionData" id="region-data" />
          </div>
          <div className="form-group col-6">
            <label className="form-check-label" htmlFor="query">Запрос:</label>
            <textarea onChange={this.handleChange} className="form-control" rows="10" value={query} name="query" id="query" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-6">
            <button type="button" className="btn btn-success" disabled={regionData === ''} title="Скопировать данные в буфер обмена">Копировать</button>
          </div>
          <div className="form-group col-6">
            <button type="button" className="btn btn-success" disabled={query === ''} title="Скопировать запрос в буфер обмена">Копировать</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
