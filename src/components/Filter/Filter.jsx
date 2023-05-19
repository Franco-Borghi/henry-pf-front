import { useEffect, useState } from "react"
import motorcycles from "../../data.json"
import { useDispatch, useSelector } from "react-redux"
import { changeFilterBrand, changeFilterCategory } from "../../redux/actions"


export default function Filter(){
    const motorcyclesData = motorcycles.motorcycles
    const [categories, setCategories] = useState([])
    const [marcas, setMarcas] = useState([])
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const dispatch = useDispatch();
    let [displayedMoto, setDisplayedMoto] = useState([])
    motorcyclesData.forEach(m => {if(!marcas.includes(m.brand)) setMarcas(marcas.concat(m.brand))})
    motorcyclesData.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})

    useEffect(() =>{
        if(categoriesFilter.length >0 && brandsFilter.length > 0){
            setDisplayedMoto(motorcyclesData.filter(motorcycle => categoriesFilter.includes(motorcycle.category) && brandsFilter.includes(motorcycle.brand)))
        } else if(categoriesFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => categoriesFilter.includes(m.category)))
        } else if(brandsFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => brandsFilter.includes(m.brand)))
        }else setDisplayedMoto(motorcyclesData)
    }, [categoriesFilter, brandsFilter])

    function handleFilterCat(e){
        dispatch(changeFilterCategory(e.target.value))
    }

    function handleFilterBrand(e){
        dispatch(changeFilterBrand(e.target.value))
    }

    return <>
    <h1>FILTROS</h1>
    <h4>Categoria</h4>
    {categories.map(c => <><input type="checkbox" onClick={handleFilterCat} value={c} checked={categoriesFilter.includes(c)}/><label>{c}</label></>)}
    <h4>Marca</h4>
    {marcas.map(c => <><input type="checkbox" onClick={handleFilterBrand} value={c} checked={brandsFilter.includes(c)} /><label>{c}</label></>)}
    {displayedMoto.length>0 ? displayedMoto.map(m => <div><p>Brand: {m.brand} Cat: {m.category}</p></div>): <p>No hay nada en el inventario que cumpla con los filtros</p>}
    </>
}