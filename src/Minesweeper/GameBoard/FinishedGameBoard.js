import React from 'react';
import GameBoard from './GameBoard';

function FinishedGameBoard(props){
    return (
        <div>
            <p>Finished</p>
            <GameBoard />
        </div>
    );
}

export default FinishedGameBoard;
