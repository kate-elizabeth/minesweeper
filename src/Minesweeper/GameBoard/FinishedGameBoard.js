import React from 'react';
import GameBoard from './GameBoard';

function FinishedGameBoard(props){
    const {board} = props;
    return (
        <div>
            <GameBoard onBombCellClick={() => {}}
                        onEmptyCellClick={() => {}}
                        onNumberCellClick={() => {}}
                        board={board}
            />
        </div>
    );
}

export default FinishedGameBoard;
