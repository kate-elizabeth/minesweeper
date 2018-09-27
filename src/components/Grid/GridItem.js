import React from 'react';
import PropTypes from 'prop-types';

import styles from './Grid.css';

function GridItem(props){
    return (
        <div className={styles.item}>{props.children}</div>
    );
}

GridItem.prototypes = {
    children : PropTypes.arrayOf(PropTypes.element),
}


export default GridItem;