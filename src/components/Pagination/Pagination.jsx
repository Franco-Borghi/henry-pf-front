import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) {
  let pageNumbers = [];

  if (currentPage > 2) {
    pageNumbers.push(currentPage - 1);
  }

  if (currentPage !== 1 && currentPage !== totalPages) {
    pageNumbers.push(currentPage);
  }

  if (currentPage < totalPages - 1) {
    pageNumbers.push(currentPage + 1);
  }

  return (
    <div className={styles.pagination}>
       {currentPage !== 1 && (
        <button className={styles.paginationButton} onClick={onPreviousPage}>
          Previous
        </button>
      )}

      <button className={styles.paginationButton} onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        1
      </button>


      {currentPage > 3 && <span className={styles.paginationSeparator}>...</span>}


      {pageNumbers.map((pageNumber) => (
        <button
          className={styles.paginationButton}
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages - 2 && <span className={styles.paginationSeparator}>...</span>}
      

      <button className={styles.paginationButton} onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        {totalPages}
      </button>

     
      {currentPage !== totalPages && (
        <button className={styles.paginationButton} onClick={onNextPage}>
          Next
        </button>
      )}
    </div>
  );
}
