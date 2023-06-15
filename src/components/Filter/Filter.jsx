import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory, fetchDataByName, changeMaxPrice, changeMinPrice} from "../../redux/actions";
import styles from './Filter.module.scss';



export default function Filter(){
    const allMotorcycles = useSelector(state => state.allMotorcycles)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const minPrice = useSelector(state => state.minPrice);
    const maxPrice = useSelector(state => state.maxPrice);
    const dispatch = useDispatch();
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const ascendingState = useSelector(state => state.orderAsc);
    const descendingState = useSelector(state => state.orderDesc);
    const activeSearch = useSelector(state => state.activeSearch);
    
    allMotorcycles.forEach(m => {if(!brands.includes(m.brand)) setBrands(brands.concat(m.brand))})
    allMotorcycles.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})


    function handleFilterCat(e){
        dispatch(changeFilterCategory(e.target.value))
    }

    function handleFilterBrand(e){
        dispatch(changeFilterBrand(e.target.value))
    }

    function resetFilters(){
        categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)));
        brandsFilter.forEach(b => dispatch(changeFilterBrand(b)));
        fetchDataByName(dispatch,'');

        document.getElementById('searchbar-input').value = '';

        if (ascendingState && document.getElementById('ascending')) {
          document.getElementById('ascending').click();
        }

        if (descendingState && document.getElementById('descending')) {
          document.getElementById('descending').click();
        }

        dispatch(changeMinPrice(null));
        dispatch(changeMaxPrice(null));
   
    }

    function handleMinPriceChange(e) {
      const value = e.target.value;
      dispatch(changeMinPrice(value !== "" ? parseFloat(value) : null))
      // setMinPrice(value !== "" ? parseFloat(value) : null);
    }
    
    function handleMaxPriceChange(e) {
      const value = e.target.value;
      dispatch(changeMaxPrice(value !== "" ? parseFloat(value) : null))
    }

    const areFiltersSelected = categoriesFilter.length > 0 || brandsFilter.length > 0 ||  minPrice !== null || maxPrice !== null;
   
    

    return (
        <div className={styles['filters']}>
        <h2 style={{ marginBottom: '10px'}}>Filters</h2>
        {
        areFiltersSelected || ascendingState || descendingState || activeSearch
        ? <button className={styles.buttonReset} onClick={resetFilters}>Reset</button>
        : <button className={styles.buttonResetFalse}>Reset</button>
        }
        <div className={styles['filterSection']}>
            <h4>Category</h4>
            {categories.map(c => 
              <div key={c}>
                <input type="checkbox" onClick={handleFilterCat} value={c} checked={categoriesFilter.includes(c)}/><label>{c}</label><br/>
              </div>
            )}
        </div>
        <div className={styles['filterSection']}>
            <h4>Brand</h4>
            {brands.map(c => 
              <div key={c}>
                <input type="checkbox" onClick={handleFilterBrand} value={c} checked={brandsFilter.includes(c)} /><label>{c}</label><br/>
              </div>
            )}
        </div>
          <h4>Price Range</h4>
          <div className={styles['price-wrapper']}>
            <div>
              <label>Min Price:</label>
              <input type="number" onChange={handleMinPriceChange} value={minPrice || ""} />
            </div>
            <div>
              <label>Max Price:</label>
              <input type="number" onChange={handleMaxPriceChange} value={maxPrice || ""} />
            </div>
          </div>
    </div>
    )
}
