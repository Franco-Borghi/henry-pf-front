import { useEffect, useState } from "react"
import motorcycles from "../../data.json"
import { useDispatch, useSelector } from "react-redux"
import { changeFilterBrand, changeFilterCategory } from "../../redux/actions"
import Order from "../Order/Order"


export default function Filter(){
    const motorcyclesData = motorcycles.motorcycles
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const dispatch = useDispatch();
    let [displayedMoto, setDisplayedMoto] = useState([])
    motorcyclesData.forEach(m => {if(!brands.includes(m.brand)) setBrands(brands.concat(m.brand))})
    motorcyclesData.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})

    useEffect(() =>{
        if(categoriesFilter.length >0 && brandsFilter.length > 0){
            setDisplayedMoto(motorcyclesData.filter(motorcycle => categoriesFilter.includes(motorcycle.category) && brandsFilter.includes(motorcycle.brand)))
        } else if(categoriesFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => categoriesFilter.includes(m.category)))
        } else if(brandsFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => brandsFilter.includes(m.brand)))
        }else setDisplayedMoto(motorcyclesData)
        document.getElementById("ascending").checked = false
        document.getElementById("descending").checked = false
    }, [categoriesFilter, brandsFilter])

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

    return <>
    <h1>Filters</h1>
    <button onClick={resetFilters}>Reset Filters</button>
    <h4>Category</h4>
    {categories.map(c => <><input type="checkbox" onClick={handleFilterCat} value={c} checked={categoriesFilter.includes(c)}/><label>{c}</label></>)}
    <h4>Brand</h4>
    {brands.map(c => <><input type="checkbox" onClick={handleFilterBrand} value={c} checked={brandsFilter.includes(c)} /><label>{c}</label></>)}
    <Order displayedMoto={displayedMoto} setDisplayedMoto={setDisplayedMoto}></Order>
    {displayedMoto.length>0 ? displayedMoto.map(m => <div><p>Brand: {m.brand} Cat: {m.category} Price: {m.price}</p></div>): <p>Nothing suits the filtering</p>}
    </>
}