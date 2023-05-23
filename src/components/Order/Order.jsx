import React, { useRef } from 'react';
import styles from './Order.module.css'
import { useDispatch } from 'react-redux';
import { orderAscending, orderDescending } from '../../redux/actions';


export default function Order(props){

    const dispatch = useDispatch();
    const ascendingBtn = useRef(null)
    const descendingBtn = useRef(null)
    
    function handleClick(e){
        if(e.target.value === "ascending"){
            dispatch(orderAscending(ascendingBtn.current.checked))
            descendingBtn.current.checked = false
        } else if (e.target.value === "descending"){
            dispatch(orderDescending(descendingBtn.current.checked))
            ascendingBtn.current.checked = false
        }
    }

    return (
        <div className={styles.order}>
    <h3>Order by price</h3>
    <div>
    <input type="checkbox" value="ascending" name="order" id="ascending" onClick={handleClick} ref={ascendingBtn}/> <label htmlFor="ascending">Ascending</label>
    </div>
    <div>
    <input type="checkbox" value="descending" name="order" id="descending" onClick={handleClick} ref={descendingBtn}/> <label htmlFor="descending">Descending</label>
    </div>
    </div>
    )
}