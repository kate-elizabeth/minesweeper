import React from 'react';
import Game from '../GameState/Game';
import BombGameCell from './BombGameCell';
import NumberGameCell from './NumberGameCell';
import EmptyGameCell from './EmptyGameCell';

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
                                        return <BombGameCell key={j} data={cell} onClick={onBombCellClick}/>
                                    }
                                    if(game.isNumberGameCell(cell)){
                                        return <NumberGameCell key={j} data={cell} onClick={onNumberCellClick} />
                                    }else{
                                        return <EmptyGameCell key={j} data={cell} onClick={onEmptyCellClick} />
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

