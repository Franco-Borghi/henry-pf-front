import React from 'react';
import styles from './FilterBar.module.scss';

function FilterBar(props) {
  return (
    <nav className={styles['filter-bar-container']}>
      <div className={styles['sticky']}>
        <div className={styles['move']}>
          {props.children}
        </div>
      </div>
    </nav>
  )
}

export default FilterBar