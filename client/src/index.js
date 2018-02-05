import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <h1>Hello, World!</h1>
);

const div = document.getElementById('app');

// render on page
ReactDOM.render(<App />, div);