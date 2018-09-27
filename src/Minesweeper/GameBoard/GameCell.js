import React from 'react';
import styles from './styles.css';

function GameCell(props){
    const {onClick, data} = props;

    var onCellClick = (event) => {
        onClick(data.row, data.column);
        event.preventDefault();
    }

    return (
        <td>
            <button className={styles.gamecell} onClick={onCellClick}>{data.value}</button>
        </td>
    );
}

export default GameCell;


