import React, { Component } from 'react';
import MinesweeperGame from '../Minesweeper/GameManager';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Play Minesweeper!</h1>
        </header>
        <div>
          <MinesweeperGame />
        </div>
      </div>
    );
  }
}

export default App;
