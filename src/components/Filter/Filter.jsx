import { useEffect, useRef, useState } from "react"
import motorcycles from "../../data.json"

export default function Filter(){
    const motorcyclesData = motorcycles.motorcycles
    const [categories, setCategories] = useState([])
    const [marcas, setMarcas] = useState([])
    let [categoriesFilter, setCategoriesFilter] = useState([])
    let [brandsFilter, setBrandsFilter] = useState([])
    let [displayedMoto, setDisplayedMoto] = useState([])
    const changeCat = useRef(categoriesFilter)
    const changeBrand = useRef(brandsFilter)

    useEffect(() =>{
        if(categoriesFilter.length >0 && brandsFilter.length > 0){
            setDisplayedMoto(motorcyclesData.filter(motorcycle => categoriesFilter.includes(motorcycle.category) && brandsFilter.includes(motorcycle.brand)))
        } else if(categoriesFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => categoriesFilter.includes(m.category)))
        } else if(brandsFilter.length >0){
            setDisplayedMoto(motorcyclesData.filter(m => brandsFilter.includes(m.brand)))
        }else setDisplayedMoto(motorcyclesData)
    }, [categoriesFilter, brandsFilter])

    useEffect(()=>{
        const auxMarcas = []
        const auxCategories = []
        if(categoriesFilter.length === 0 && brandsFilter.length === 0){
            displayedMoto.forEach(m => {if(!auxMarcas.includes(m.brand)) auxMarcas.push(m.brand)})
            displayedMoto.forEach(m => {if(!auxCategories.includes(m.category)) auxCategories.push(m.category)})
            auxCategories.sort()
            setCategories(auxCategories)
            auxMarcas.sort()
            setMarcas(auxMarcas)
        }
        if(changeCat.current.length !== categoriesFilter.length) {
            if(categoriesFilter.length === 0) motorcyclesData.forEach(m => {if(!auxMarcas.includes(m.brand)) auxMarcas.push(m.brand)})
            else displayedMoto.forEach(m => {if(!auxMarcas.includes(m.brand)) auxMarcas.push(m.brand)})
            changeCat.current = categoriesFilter
            auxMarcas.sort()
            setMarcas(auxMarcas)
        }else if(changeBrand.current.length !== brandsFilter.length){
            if(brandsFilter.length === 0) motorcyclesData.forEach(m => {if(!auxCategories.includes(m.category)) auxCategories.push(m.category)})
            else displayedMoto.forEach(m => {if(!auxCategories.includes(m.category)) auxCategories.push(m.category)})
            console.log(changeBrand.current, brandsFilter);
            changeBrand.current = brandsFilter
            auxCategories.sort()
            setCategories(auxCategories)
        }
        // console.log(displayedMoto);
    }, [displayedMoto])

    function handleFilterCat(e){
        e.target.checked ?
        setCategoriesFilter(categoriesFilter.concat(e.target.value)) :
        setCategoriesFilter([...categoriesFilter.filter(c => c !== e.target.value)])
    }

    function handleFilterBrand(e){
        e.target.checked ? 
        setBrandsFilter(brandsFilter.concat(e.target.value)):
        setBrandsFilter([...brandsFilter.filter(c => c !== e.target.value)])
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