import React  from 'react';
import GameCell from './GameCell';
import styles from './styles.css';

function BombGameCell(props){
    const {data, onClick} = props;
    return(
        <GameCell data={data} onClick={onClick}>
            <i className={`fas fa-bomb ${styles.bomb}`}></i>
        </GameCell>
    );
}

export default BombGameCell;


