import React from 'react';
import styles from './FilterBar.module.scss';

function FilterBar(props) {
  return (
    <nav className={styles['filter-bar-container']}>
      {props.children}
    </nav>
  )
}

export default FilterBar