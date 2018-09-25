import React from 'react';
import ReactDOM from 'react-dom';
import GameManager from '../GameManager';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});
