import React from 'react';
import styles from './Order.module.css'


export default function Order(props){
    
    function handleClick(e){
        if(e.target.value === "ascending"){
            props.setDisplayedMotorcycles([...props.displayedMotorcycles.sort((a, b) => a.price - b.price)])
        } else if (e.target.value === "descending"){
            props.setDisplayedMotorcycles([...props.displayedMotorcycles.sort((a, b) => b.price - a.price)])
        }
    }

    return (
        <div className={styles.order}>
    <h3>Order by price</h3>
    <div>
    <input type="radio" value="ascending" name="order" id="ascending" onClick={handleClick} ref={props.refAsc}/> <label htmlFor="ascending">Ascending</label>
    </div>
    <div>
    <input type="radio" value="descending" name="order" id="descending" onClick={handleClick} ref={props.refDesc}/> <label htmlFor="descending">Descending</label>
    </div>
    </div>
    )
}