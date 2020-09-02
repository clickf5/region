import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [],
      form: {
        region: 'default',
        regionData: '',
        query: '',
        salonId: '1',
        delimeter: ',',
        sortFrom: '0',
        useTruncate: false,
        foreignKeysOff: false,
      },
    };
  }

  async componentDidMount() {
    const { form } = this.state;
    const { data: { success, payload } } = await axios.get('/api/regions');
    if (success) {
      this.setState({
        regions: payload,
        form: { ...form, query: this.formQuery(form) },
      });
      return;
    }
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

      return `INSERT INTO \`clients_region\`(\`name\`, \`ord\`) VALUES ('${name.trim()}', ${order});\nSET @LAST_ID = LAST_INSERT_ID();\nINSERT INTO \`clients_regions_to_salons\`(\`salon_id\`, \`region_id\`, \`ord\`) VALUES (${salon}, @LAST_ID, ${order});\n`;
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

  handleSelect = ({ target: { value, name } }) => {
    const { form, regions } = this.state;

    const region = regions.find(({ _id }) => _id === value);

    const changedDistricts = {
      ...form,
      regionData: region.districts,
      [name]: value,
    };

    const changedQueryState = { ...changedDistricts, query: this.formQuery(changedDistricts) };

    this.setState({ form: { ...changedQueryState } });
  }

  renderRegionsSelect() {
    const { regions, form: { region } } = this.state;
    const options = regions.map(({ _id, name }) => (
      <option key={_id} value={_id}>{name}</option>
    ));

    const defaltOption = <option key="default" value="default" disabled hidden={region !== ''}>Выберите регион</option>;
    const withDefaultOption = [defaltOption, ...options];

    return (
      <select onChange={this.handleSelect} className="form-control" id="region" value={region} name="region">
        {withDefaultOption}
      </select>
    );
  }

  renderDistrictsCount = () => {
    const { form: { regionData, delimeter } } = this.state;

    if (regionData === '') {
      return null;
    }

    const countOfRegion = regionData.split(delimeter).length;
    const styles = {
      position: 'absolute', bottom: '76px', right: '19px', zIndex: 101,
    };

    return (
      <span className="badge badge-light" style={styles}>
        Всего элементов:&nbsp;
        {countOfRegion}
      </span>
    );
  };

  render() {
    const {
      form: {
        regionData, salonId, delimeter, sortFrom, useTruncate, foreignKeysOff, query,
      },
    } = this.state;

    return (
      <form>
        <div className="form-row">
          <div className="col-5">
            <div className="form-row align-items-end">
              <div className="form-group col-10">
                <label htmlFor="regions">Регион:</label>
                {this.renderRegionsSelect()}
              </div>
              <div className="form-group col-2">
                <div className="btn-group btn-block" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-success" title="Добавить новый регион в список">+</button>
                  <button type="button" className="btn btn-danger" title="Удалить выбранный в списке регион">-</button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="delimeter" title='Символ-разделитель элементов в поле "Данные"'>Разделитель:</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="delimeter" name="delimeter" value={delimeter} />
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="form-row">
              <div className="form-group col-4">
                <label htmlFor="salon-id" title="ID дилерского центра в CRM">ID салона:</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="salon-id" name="salonId" value={salonId} />
              </div>
              <div className="form-group col-4">
                <label htmlFor="sort_from" title="Смещение значений для поля `ord` в таблицах `clients_region` и `clients_regions_to_salons`">Сортировка начиная с:</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="sort-from" name="sortFrom" value={sortFrom} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-4">
                <div className="form-check">
                  <input onChange={this.handleChange} name="useTruncate" checked={useTruncate} className="form-check-input" type="checkbox" id="truncate" />
                  <label className="form-check-label" htmlFor="truncate" title={'Добавляет запросы на очистку таблиц \nTRUNCATE `clients_region`;\nTRUNCATE `clients_regions_to_salons`;'}>Добавить TRUNCATE</label>
                </div>
              </div>
              <div className="form-group col-6">
                <div className="form-check">
                  <input onChange={this.handleChange} name="foreignKeysOff" checked={foreignKeysOff} className="form-check-input" type="checkbox" id="foreign-keys-off" />
                  <label className="form-check-label" htmlFor="foreign-keys-off" title={'Добавляет запросы\nSET FOREIGN_KEY_CHECKS=0; вначале\nSET FOREIGN_KEY_CHECKS=1; в конце.'}>Отключать проверку внешних ключей</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-5">
            <div style={{ position: 'relative' }}>
              {regionData !== '' && this.renderDistrictsCount()}
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="form-check-label" htmlFor="region-data">Данные:</label>
                  <textarea onChange={this.handleChange} className="form-control" rows="10" value={regionData} name="regionData" id="region-data" placeholder="Внесите данные вручную или выберите регион из списка" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-4">
                  <button type="button" className="btn btn-success" disabled={regionData === ''} title="Скопировать данные в буфер обмена">Копировать</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="form-row">
              <div className="form-group col-12">
                <label className="form-check-label" htmlFor="query">Запрос:</label>
                <textarea onChange={this.handleChange} className="form-control" rows="10" value={query} name="query" id="query" placeholder="Запрос формируется автоматически с учетом настроек" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-4">
                <button type="button" className="btn btn-success" disabled={query === ''} title="Скопировать запрос в буфер обмена">Копировать</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
