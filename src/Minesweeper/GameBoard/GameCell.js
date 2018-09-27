import React, {Component} from 'react';
import styles from './styles.css';
import CellStyles from './CellStyles';

class GameCell extends Component {
    constructor(props){
        super(props);
        this.cellStyles = CellStyles();
    }

    onCellClick = (event) => {
        const {onClick, data} = this.props;
        onClick(data.row, data.column);
        event.preventDefault();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.props.data.isClicked !== nextProps.data.isClicked;
    }

    render(){
        const {data, children} = this.props;
        var style = `${styles.gamecell}`;
        if(data.value >= 0){
            style += ` ${this.cellStyles[data.value]}`;
        }
        return (
            <td>
                {(data.isClicked) ?  <button className={style} disabled={true} onClick={this.onCellClick}>
                                        {children}
                                    </button>
                                : <button className={`${styles.gamecell} ${styles.unclickedgamecell}`} onClick={this.onCellClick}></button>}
            
            </td>
        );
    }

    
}
                            

export default GameCell;


