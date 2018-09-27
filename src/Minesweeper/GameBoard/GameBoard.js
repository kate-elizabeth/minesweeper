import React from 'react';
import Game from '../GameState/Game';
import GameCell from './GameCell';

import styles from './styles.css';


function GameBoard(props){
    const {board, onBombCellClick, onEmptyCellClick, onNumberCellClick} = props;
    const game = Game();
    return(
        <div className={styles.gameboard}>
            <table>
                <thead>

                </thead>
                <tbody>
                    {board.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((cell, j) => {
                                    if(game.isBombGameCell(cell, j)){
                                        return <GameCell key={j} data={cell} onClick={onBombCellClick}/>
                                    }
                                    if(game.isNumberGameCell(cell)){
                                        return <GameCell key={j} data={cell} onClick={onNumberCellClick} />
                                    }else{
                                        return <GameCell key={j} data={cell} onClick={onEmptyCellClick} />
                                    }
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default GameBoard;

