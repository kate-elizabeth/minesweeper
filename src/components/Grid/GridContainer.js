import React from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.css';

function Grid(props){
    return (
        <div className={styles.container}>{props.children}</div>
    );
}

Grid.propTypes = {
    children : PropTypes.arrayOf(PropTypes.element),
}

export default Grid;
