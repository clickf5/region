import React from 'react';
import Form from './Form';

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
        <Form />
      </div>
    </div>
  </>
);

export default App;
