import React, {Component} from 'react';
import styles from './styles.css';


class GameSettingsInput extends Component{
    constructor(props){
        super(props);
        let {onSubmit} = props;
        this.state = {
            rows: 15,
            columns: 25,
            onSubmit: onSubmit,
            min: 5,
            max: 50,
        }
    }

    onRowChange = (event) => {
        let val = event.target.value;
        this.setState({rows: val});
    };
    

    onColumnChange = (event) => {
        let val = event.target.value;
        this.setState({columns:val});
    };

    handleSubmit = (event) => {
        let {onSubmit, rows, columns, min, max} = this.state;
        if(this.isValidValue(rows, min, max) && this.isValidValue(columns, min, max)){
            onSubmit(rows, columns);
            event.preventDefault();
        }
    };

    isValidValue = (val, min, max) => {
        return (val >= min && val <= max );
    }

    render(){
        const {min, max} = this.state;
        return (
                <div className={`${styles.gamesettings} ${styles.panel}`}>
                    <h2 className={styles.gametitle}>Hello!</h2>
                    <div className={styles.panel}>
                        <p>Please select the board dimensions for your game.</p>
                        <label className={styles.item}>
                            No. Rows:
                            <input className={styles.item} type="number" 
                                    value={this.state.rows} step="5" min={min} max={max} 
                                    onChange={this.onRowChange} />
                        </label>
                        <label className={styles.item}>
                            No. Columns:
                            <input className={styles.item} type="number" 
                                    value={this.state.columns} step="5" min={min} max={max}
                                    onChange={this.onColumnChange}/>
                        </label>
                        <p>{`(Min value is ${min} and Max value is ${max} for either)`}</p>
                    </div>
                    <div className={styles.panel}>
                        <button className={styles.button} onClick={this.handleSubmit}>Start Game!</button>
                    </div>
                </div>
                );
    }
        
    
}

export default GameSettingsInput;
