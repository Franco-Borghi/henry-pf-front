import React from 'react';
import styles from './FilterBar.module.scss';

function FilterBar(props) {
  return (
    <nav style={{ width: props.status === true ? '' : '0', paddingLeft: props.status === true ? '' : '0', paddingRight: props.status === true ? '' : '0'}} className={styles['filter-bar-container']}>
      <div style={{ opacity: props.status === true ? '' : '0'}} className={styles['sticky']}>
        <div className={styles['move']}>
          {props.children}
        </div>
      </div>
    </nav>
  )
}

export default FilterBar