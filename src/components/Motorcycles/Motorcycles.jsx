import React, { useEffect, useState } from 'react';
import Motorcycle from '../Motorcycle/Motorcycle';
import Pagination from '../Pagination/Pagination';
import Filter from "../Filter/Filter";
import Order from '../Order/Order';
import { useSelector } from 'react-redux';
import FilterBar from '../FilterBar/FilterBar';
import styles from './Motorcycles.module.scss';
import  {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Motorcycles() {
  const motorcyclesData = useSelector(state => state.motos);
  const categoriesFilter = useSelector(state => state.filterCategory);
  const brandsFilter = useSelector(state => state.filterBrand);
  const orderAscending = useSelector(state => state.orderAsc);
  const orderDescending = useSelector(state => state.orderDesc);
  const minPrice = useSelector(state => state.minPrice);
  const maxPrice = useSelector(state => state.maxPrice);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);
  const [filterbar, setFilterbar] = React.useState(window.innerWidth > 1023 ? true : false);
  const [width, setWidth] = React.useState(window.innerWidth);

  const motorcyclesPerPage = 6;
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
    if (minPrice !== null) {
      motorcyclesAux = motorcyclesAux.filter(motorcycle => motorcycle.price >= minPrice);
    }
  
    if (maxPrice !== null) {
      motorcyclesAux = motorcyclesAux.filter(motorcycle => motorcycle.price <= maxPrice);
    }

    setDisplayedMotorcycles(motorcyclesAux);
    setCurrentPage(1);
  }, [motorcyclesData, categoriesFilter, brandsFilter, orderAscending, orderDescending, minPrice, maxPrice]);

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

  const onResize = () => {
    setFilterbar(window.innerWidth > 1023 ? true : false);
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div className={styles.carouselImage}>
        <Carousel showThumbs={false} autoPlay={true} interval={5000}>
            <img style={{ objectPosition: 'center'}} src='/carousel/image1.jpeg' alt='clasica' />
            <img src='/carousel/image2.jpeg' alt='deportiva' />
            <img src='/carousel/image3.jpeg' alt='scooter' />
            <img src='/carousel/image4.jpeg' alt='trabajo' />
        </Carousel>
      </div>

      <div className={styles.motorcyclesPage}>

      {
        filterbar && width < 1024
        ? <div onClick={() => setFilterbar(false)} className={styles['filter-overlay']}></div>
        : null
      }

        <div className={styles['filter-bar-trigger']}>
          <div>
            {
              filterbar
              ? <p onClick={() => setFilterbar(!filterbar)}>Close Filters</p>
              : <p onClick={() => setFilterbar(!filterbar)}>Open Filters</p>
            }
          </div>
        </div>

        <FilterBar status={filterbar}>
          <div className={styles.filterOrderSection}>
            <Filter/>
            <Order displayedMotorcycles={displayedMotorcycles} setDisplayedMotorcycles={setDisplayedMotorcycles} />
          </div>
        </FilterBar>

        <div className={styles.motorcycleList}>
          {currentMotorcycles.length > 0 ? (
            currentMotorcycles.map(motorcycle => (
              // <div className={styles.motorcycleItem} key={motorcycle.id}>
                <Motorcycle key={motorcycle.id} info={motorcycle} />
              // </div>
            ))
          ) : (
            <p className={styles.paragraph}>No motorcycles available</p>
          )}
        </div>

        <div className={styles.pagination}>
          {
            totalPages > 1
            ? <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onPreviousPage={goToPreviousPage}
                onNextPage={goToNextPage}
              />
            : null
          }
        </div>
      </div>
    </>

  );
}
