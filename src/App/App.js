import React, { Component } from 'react';
import MinesweeperGame from '../Minesweeper/GameManager';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Minesweeper</p>
        </header>
        <div className="App-body">
          <div className="Game-Container">
            <MinesweeperGame />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
