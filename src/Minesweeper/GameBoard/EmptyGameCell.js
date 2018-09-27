import React  from 'react';
import GameCell from './GameCell';

function EmptyGameCell(props){
    const {data, onClick} = props;
    return(
        <GameCell data={data} onClick={onClick}>
        </GameCell>
    );
}

export default EmptyGameCell;


