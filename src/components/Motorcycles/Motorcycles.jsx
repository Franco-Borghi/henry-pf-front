import React, { useEffect, useState } from 'react';
import Motorcycle from '../Motorcycle/Motorcycle';
import Pagination from '../Pagination/Pagination';
import Filter from "../Filter/Filter";
import Order from '../Order/Order';
import { useSelector } from 'react-redux';
import FilterBar from '../FilterBar/FilterBar';
import styles from './Motorcycles.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Motorcycles() {
  const motorcyclesData = useSelector(state => state.motos);
  const categoriesFilter = useSelector(state => state.filterCategory);
  const brandsFilter = useSelector(state => state.filterBrand);
  const orderAscending = useSelector(state => state.orderAsc);
  const orderDescending = useSelector(state => state.orderDesc);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);

  const motorcyclesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let motorcyclesAux = [...motorcyclesData];

    if (categoriesFilter.length > 0) {
      motorcyclesAux = motorcyclesAux.filter(motorcycle => categoriesFilter.includes(motorcycle.category));
    }

    if (brandsFilter.length > 0) {
      motorcyclesAux = motorcyclesAux.filter(motorcycle => brandsFilter.includes(motorcycle.brand));
    }

    if (orderAscending) {
      motorcyclesAux.sort((a, b) => a.price - b.price);
    }

    if (orderDescending) {
      motorcyclesAux.sort((a, b) => b.price - a.price);
    }

    setDisplayedMotorcycles(motorcyclesAux);
    setCurrentPage(1);
  }, [motorcyclesData, categoriesFilter, brandsFilter, orderAscending, orderDescending]);

  const totalMotorcycles = displayedMotorcycles.length;
  const totalPages = Math.ceil(totalMotorcycles / motorcyclesPerPage);
  const indexOfLastMotorcycle = currentPage * motorcyclesPerPage;
  const indexOfFirstMotorcycle = indexOfLastMotorcycle - motorcyclesPerPage;
  const currentMotorcycles = displayedMotorcycles.slice(indexOfFirstMotorcycle, indexOfLastMotorcycle);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <div className={styles.motorcyclesPage}>
      <FilterBar>
        <div className={styles.filterOrderSection}>
          <Filter displayedMotorcycles={displayedMotorcycles} />
          <Order displayedMotorcycles={displayedMotorcycles} setDisplayedMotorcycles={setDisplayedMotorcycles} />
        </div>
      </FilterBar>

      <div className={styles.carouselImage}>
        <Carousel showThumbs={false} autoPlay={true} interval={2000}>
          <div>
            <img src='/carousel/clasica.jpg' alt='clasica' />
          </div>
          <div>
            <img src='/carousel/deportiva.jpg' alt='deportiva' />
          </div>
          <div>
            <img src='/carousel/scooter.jpg' alt='scooter' />
          </div>
          <div>
            <img src='/carousel/trabajo.jpg' alt='trabajo' />
          </div>
        </Carousel>
      </div>

      <div className={styles.motorcycleList}>
        {currentMotorcycles.length > 0 ? (
          currentMotorcycles.map(motorcycle => (
            <div className={styles.motorcycleItem} key={motorcycle.id}>
              <Motorcycle info={motorcycle} />
            </div>
          ))
        ) : (
          <p className={styles.paragraph}>No motorcycles available</p>
        )}
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
  );
}
