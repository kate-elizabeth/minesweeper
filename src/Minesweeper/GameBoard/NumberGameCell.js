import React  from 'react';
import GameCell from './GameCell';

function NumberGameCell(props){
    const {data, onClick} = props;
    return(
        <GameCell data={data} onClick={onClick}>
            {data.value}
        </GameCell>
    );
}

export default NumberGameCell;


