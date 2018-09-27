import React, {Component} from 'react';
import GameStateBuilder from './GameState/GameStateBuilder';
import StarterGameBoard from './GameBoard/StarterGameBoard';
import InProgressGameBoard from './GameBoard/InProgressGameBoard';
import FinishedGameBoard from './GameBoard/FinishedGameBoard';



var GAME_STATUS = {
    INTRO: 'INTRO',
    INPROGRESS: 'INPROGRESS',
    LOST: 'LOST',
    WON: 'WON',
}

class GameManager extends Component {
    constructor(props){
        super(props);
        this.gameStateBuilder = GameStateBuilder();
        let {bombs, rows, columns} = this.props;
        this.state = {
            gameStatus: GAME_STATUS.INTRO,
            board: this.gameStateBuilder.buildStarterGameBoard(20, 35),
            bombs: 200,
            rows: 25,
            columns: 35,
        }
    }

    handleFirstClick = (i, j) => {
        let board = this.gameStateBuilder.buildNewGame(this.state.rows, this.state.columns, this.state.bombs, i, j);
        this.setState({
            board: board,
            gameStatus: GAME_STATUS.INPROGRESS,
        })
        //this.handleEmptyCellClick(i,j);
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
            case GAME_STATUS.INTRO:
                return <StarterGameBoard board={board} onCellClick={this.handleFirstClick}/>               
            case GAME_STATUS.INPROGRESS:
                return <InProgressGameBoard board={board} 
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