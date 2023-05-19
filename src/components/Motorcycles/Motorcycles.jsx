import React, { useEffect, useRef, useState } from 'react';
import Motorcycle from '../Motorcycle/Motorcycle';
import Pagination from '../Pagination/Pagination';
import Filter from "../Filter/Filter"
import Order from '../Order/Order';
import { useSelector } from 'react-redux';

export default function Motorcycles() {
    // const [motorcyclesData, setMotorcyclesData] = useState([]); // Cuando este el back se cambia a la llamada al back para obtener los datos
    const motorcyclesData = useSelector(state => state.motos)

    const ascendingBtn = useRef(null)
    const descendingBtn = useRef(null)
    
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const [displayedMotorcycles, setDisplayedMotorcycles] = useState([])

  //#region Data for pagination component
    const [currentPage, setCurrentPage] = useState(1);
    const motorcyclesPerPage = 2;
    const totalPages = Math.ceil(displayedMotorcycles.length / motorcyclesPerPage);
    const indexOfLastMotorcycle = currentPage * motorcyclesPerPage;
    const indexOfFirstMotorcycle = indexOfLastMotorcycle - motorcyclesPerPage;
    const currentMotorcycles = displayedMotorcycles.slice(indexOfFirstMotorcycle, indexOfLastMotorcycle); // Cambiar cuando este el back 
  //#endregion
    
    useEffect(() =>{
      if(categoriesFilter.length >0 && brandsFilter.length > 0){
        setDisplayedMotorcycles(motorcyclesData.filter(motorcycle => categoriesFilter.includes(motorcycle.category) && brandsFilter.includes(motorcycle.brand)))
      } else if(categoriesFilter.length >0){
        setDisplayedMotorcycles(motorcyclesData.filter(m => categoriesFilter.includes(m.category)))
      } else if(brandsFilter.length >0){
        setDisplayedMotorcycles(motorcyclesData.filter(m => brandsFilter.includes(m.brand)))
      }else setDisplayedMotorcycles(motorcyclesData)
      ascendingBtn.current.checked = false
      descendingBtn.current.checked = false
      setCurrentPage(1)
  }, [motorcyclesData, categoriesFilter, brandsFilter])

    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

    const goToPreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    }

    const goToNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    }


  return (
    <div>
      <Filter displayedMotorcycles={displayedMotorcycles}/>
      <Order displayedMotorcycles={displayedMotorcycles} setDisplayedMotorcycles={setDisplayedMotorcycles} refAsc={ascendingBtn} refDesc={descendingBtn}></Order>
      {currentMotorcycles.length > 0 ? currentMotorcycles.map((motorcycle) => (
        <Motorcycle key={motorcycle.id} info={motorcycle} />
      )): <p>No motorcycles available</p>}
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}

      />
    </div>  
  )}