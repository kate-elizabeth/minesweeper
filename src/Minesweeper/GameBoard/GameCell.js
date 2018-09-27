import React from 'react';


function GameCell(props){
    const {onClick, data} = props;

    var onCellClick = (event) => {
        onClick(data.row, data.column);
        event.preventDefault();
    }

    return (
        <td>
            <button onClick={onCellClick}>{data.value}</button>
        </td>
    );
}

export default GameCell;


