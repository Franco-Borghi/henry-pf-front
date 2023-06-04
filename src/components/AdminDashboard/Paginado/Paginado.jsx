import React, { useState, useEffect } from 'react';
import './Paginado.scss';

const Paginado = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? 'number active' : 'number'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className='admin-user-table__pagination'>
      {
        totalPages > 1
        ? <ul className="pagination">
            <li className={currentPage > 1 ? '' : 'active'} style={{ cursor: 'pointer' }} onClick={() => handlePrevPage()}>Prev</li>
            {renderPageNumbers()}
            <li className={currentPage < totalPages ? '' : 'active'} style={{ cursor: 'pointer' }} onClick={() => handleNextPage()}>Next</li>
          </ul>
        : null
      }
    </div>
  );
};

export { Paginado };
