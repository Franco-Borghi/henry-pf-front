import React, { useState } from 'react';
import MotorcyclesApi from '../../data.json';
import Motorcycle from '../Motorcycle/Motorcycle';
import Pagination from '../Pagination/Pagination';

export default function Motorcycles() {
    const motorcyclesData = MotorcyclesApi.motorcycles; // Cuando este el back se cambia a la llamada al back para obtener los datos

    const [currentPage, setCurrentPage] = useState(1);
    const motorcyclesPerPage = 8;
    const totalPages = Math.ceil(motorcyclesData.length / motorcyclesPerPage);

    const indexOfLastMotorcycle = currentPage * motorcyclesPerPage;
    const indexOfFirstMotorcycle = indexOfLastMotorcycle - motorcyclesPerPage;
    const currentMotorcycles = motorcyclesData.slice(indexOfFirstMotorcycle, indexOfLastMotorcycle); // Cambiar cuando este el back 

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
      {currentMotorcycles.map((motorcycle) => (
        <Motorcycle key={motorcycle.id} info={motorcycle} />
      ))}
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}

      />
    </div>  
  )}