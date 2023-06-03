import React, { useEffect, useRef } from 'react';
import styles from './Order.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { orderAscending, orderDescending } from '../../redux/actions';


export default function Order(){

    const dispatch = useDispatch();
    const ascendingBtn = useRef(null)
    const descendingBtn = useRef(null);
    const orderAscendingState = useSelector(state => state.orderAsc);
    const orderDescendingState = useSelector(state => state.orderDesc); 

    useEffect(() => {
        if(orderAscendingState) ascendingBtn.current.checked = true
        if(orderDescendingState) descendingBtn.current.checked = true
    }, [])
    
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