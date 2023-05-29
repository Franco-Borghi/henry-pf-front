import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>{
      !totalPages
      ? null
      : <button className={styles.paginationButton} onClick={onPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
    }
      
      {pageNumbers.map((pageNumber) => (
        <button
          className={styles.paginationButton}
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}{
        !totalPages 
        ? null
        : <button className={styles.paginationButton} onClick={onNextPage} disabled={currentPage === totalPages}>
          Next
         </button>}
    </div>
  );
}
