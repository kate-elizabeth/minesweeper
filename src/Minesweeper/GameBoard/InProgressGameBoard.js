import React from 'react';
import GameBoard from './GameBoard';


function InProgressGameBoard(props){
    const {board, onBombCellClick, onEmptyCellClick, onNumberCellClick} = props;
    return (
        <div>
            <GameBoard onBombCellClick={onBombCellClick}
                        onEmptyCellClick={onEmptyCellClick}
                        onNumberCellClick={onNumberCellClick}
                        board={board}
            />
        </div>
    );
}

export default InProgressGameBoard;
