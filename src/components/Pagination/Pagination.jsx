import React from 'react';

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
    <div>
      <button onClick={onPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
