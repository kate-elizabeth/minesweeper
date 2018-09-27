import React, {Component} from 'react';
import GameStateBuilder from './GameState/GameStateBuilder';
import StarterGameBoard from './GameBoard/StarterGameBoard';
import InProgressGameBoard from './GameBoard/InProgressGameBoard';
import FinishedGameBoard from './GameBoard/FinishedGameBoard';
import GameSettingsInput from './GameSettingsInput';

var GAME_STATUS = {
    PRE: 'PRE',
    INTRO: 'INTRO',
    INPROGRESS: 'INPROGRESS',
    LOST: 'LOST',
    WON: 'WON',
}

class GameManager extends Component {
    constructor(props){
        super(props);
        this.gameStateBuilder = GameStateBuilder();
        this.state = {
            gameStatus: GAME_STATUS.PRE,
            board: [[]],
            bombs: 0,
            rows: 0,
            columns: 0,
        }
    }

    handleSettingsSubmit = (rows, columns) => {
        let bombs = Math.floor((rows * columns)/3);
        let board = this.gameStateBuilder.buildStarterGameBoard(rows, columns);
        console.log(`${rows} ${columns}`)
        this.setState({
            gameStatus: GAME_STATUS.INTRO,
            board: board,
            bombs: bombs,
            rows: rows,
            columns: columns,
        });
    }

    handleFirstClick = (i, j) => {
        let board = this.gameStateBuilder.buildNewGame(this.state.rows, this.state.columns, this.state.bombs, i, j);
        board = this.gameStateBuilder.updateBoardForClickedEmptyCell(board, i, j);
        this.setState({
            board: board,
            gameStatus: GAME_STATUS.INPROGRESS,
        })
    }

    handleNumberCellClick = (i, j) => {
        console.log(`cell at ${i} and ${j} clicked!`);
        const board = this.gameStateBuilder.updateBoardForClickedGameCell(this.state.board, i, j);
        this.setState({board: board});
    }

    handleBombCellClick = (i, j) => {
        console.log(`Bomb cell clicked! at ${i} ${j}`);
        //first update to show the clicked bomb before the rest
        this.handleNumberCellClick(i,j);
        const board = this.gameStateBuilder.updateBoardForClickedBomb(this.state.board);
        this.setState({
            board:board,
            gameStatus: GAME_STATUS.LOST,
        });
    }

    handleEmptyCellClick = (i, j) => {
        console.log(`Empty cell clicked at ${i} ${j}`);
        const board = this.gameStateBuilder.updateBoardForClickedEmptyCell(this.state.board, i, j);
        this.setState({board: board});
    }

    render(){
        let {gameStatus, board} = this.state;
        switch(gameStatus){
            case GAME_STATUS.PRE:
                return <GameSettingsInput onSubmit={this.handleSettingsSubmit} />
            case GAME_STATUS.INTRO:
                return <StarterGameBoard board={board} onCellClick={this.handleFirstClick}/>               
            case GAME_STATUS.INPROGRESS:
                return <InProgressGameBoard 
                             board={board} 
                            onBombCellClick={this.handleBombCellClick}
                            onNumberCellClick={this.handleNumberCellClick}
                            onEmptyCellClick={this.handleEmptyCellClick}
                             />
            default:
                return <FinishedGameBoard board={board} />
        }
    }

}

export default GameManager;