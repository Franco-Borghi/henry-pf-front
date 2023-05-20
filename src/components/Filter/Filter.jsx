import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory } from "../../redux/actions";
import styles from './Filter.module.scss';


export default function Filter(props){
    const {displayedMotorcycles} = props
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const dispatch = useDispatch();
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    
    displayedMotorcycles.forEach(m => {if(!brands.includes(m.brand)) setBrands(brands.concat(m.brand))})
    displayedMotorcycles.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})


    function handleFilterCat(e){
        dispatch(changeFilterCategory(e.target.value))
    }

    function handleFilterBrand(e){
        dispatch(changeFilterBrand(e.target.value))
    }

    function resetFilters(){
        categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)))
        brandsFilter.forEach(b => dispatch(changeFilterBrand(b)))
    }

    return (
        <div className={styles['filters']}>
            <h1>Filters</h1>
            <button onClick={resetFilters}>Reset Filters</button>
            <h4>Category</h4>
            {categories.map(c => <><input type="checkbox" onClick={handleFilterCat} value={c} checked={categoriesFilter.includes(c)}/><label>{c}</label></>)}
            <h4>Brand</h4>
            {brands.map(c => <><input type="checkbox" onClick={handleFilterBrand} value={c} checked={brandsFilter.includes(c)} /><label>{c}</label></>)}
        </div>
    )
}
