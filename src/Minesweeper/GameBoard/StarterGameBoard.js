import React from 'react';
import GameBoard from './GameBoard';

function StarterGameBoard(props){
    const {board, onCellClick} = props;
    return (
        <div>
            <GameBoard onBombCellClick={onCellClick}
                        onEmptyCellClick={onCellClick}
                        onNumberCellClick={onCellClick}
                        board={board}
            />
        </div>
    );
}

export default StarterGameBoard;



