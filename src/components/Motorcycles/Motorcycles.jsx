import React, { useEffect, useRef, useState } from 'react';
import Motorcycle from '../Motorcycle/Motorcycle';
import Pagination from '../Pagination/Pagination';
import Filter from "../Filter/Filter"
import Order from '../Order/Order';
import { useSelector } from 'react-redux';
import FilterBar from '../FilterBar/FilterBar';
import styles from './Motorcycles.module.css'

export default function Motorcycles() {
    // const [motorcyclesData, setMotorcyclesData] = useState([]); // Cuando este el back se cambia a la llamada al back para obtener los datos
    const motorcyclesData = useSelector(state => state.motos)
    
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const orderAscending = useSelector(state => state.orderAsc)
    const orderDescending = useSelector(state => state.orderDesc)
    const [displayedMotorcycles, setDisplayedMotorcycles] = useState([])

  //#region Data for pagination component
    const [currentPage, setCurrentPage] = useState(1);
    const motorcyclesPerPage = 4;
    const totalPages = Math.ceil(displayedMotorcycles.length / motorcyclesPerPage);
    const indexOfLastMotorcycle = currentPage * motorcyclesPerPage;
    const indexOfFirstMotorcycle = indexOfLastMotorcycle - motorcyclesPerPage;
    const currentMotorcycles = displayedMotorcycles.slice(indexOfFirstMotorcycle, indexOfLastMotorcycle); // Cambiar cuando este el back 
  //#endregion
    
    useEffect(() =>{
      let motorcyclesAux = [];
      if(categoriesFilter.length >0 && brandsFilter.length > 0){
        motorcyclesAux = motorcyclesData.filter(motorcycle => categoriesFilter.includes(motorcycle.category) && brandsFilter.includes(motorcycle.brand))
      } else if(categoriesFilter.length >0){
        motorcyclesAux = motorcyclesData.filter(m => categoriesFilter.includes(m.category))
      } else if(brandsFilter.length >0){
        motorcyclesAux = (motorcyclesData.filter(m => brandsFilter.includes(m.brand)))
      }else motorcyclesAux = motorcyclesData

      if(orderAscending) motorcyclesAux = [...[...motorcyclesAux].sort((a, b) => a.price - b.price)]
      if(orderDescending) motorcyclesAux = [...[...motorcyclesAux].sort((a, b) => b.price - a.price)]

      setDisplayedMotorcycles(motorcyclesAux)
      setCurrentPage(1)

  }, [motorcyclesData, categoriesFilter, brandsFilter, orderAscending, orderDescending])

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
    <div className={styles.motorcyclesPage}>
      <FilterBar>
        <div className={styles.filterOrderSection}>
            <Filter displayedMotorcycles={displayedMotorcycles}/>
            <Order displayedMotorcycles={displayedMotorcycles} setDisplayedMotorcycles={setDisplayedMotorcycles}></Order>
        </div>

      </FilterBar>
    <div className={styles.motorcycleList}>
        {currentMotorcycles.length > 0 ? currentMotorcycles.map((motorcycle) => (
            <div className={styles.motorcycleItem} key={motorcycle.id}>
                <Motorcycle info={motorcycle} />
            </div>
        )): <p className={styles.paragraph}>No motorcycles available</p>}
    </div>
    <div className={styles.pagination}>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            onPreviousPage={goToPreviousPage}
            onNextPage={goToNextPage}
        />
    </div>
</div> 
  )}