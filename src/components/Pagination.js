import React from 'react';

const Pagination = ({ beerPerPage, totalBeers, activePage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBeers / beerPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagesLessThanTen = () => {
    return pageNumbers.map((number) => (
      <article key={number} className='pagination '>
        <button onClick={() => paginate(number)} className='active'>
          {number}
        </button>
      </article>
    ));
  };

  const pagesGreaterThanTen = () => {
    return (
      <>
        {activePage > 1 && (
          <article className='pagination'>
            <button
              aria-label='Previous'
              onClick={() => paginate(activePage - 1)}
            >
              <span aria-hidden='true'>&laquo;</span>
              <span>Previous</span>
            </button>
          </article>
        )}
        <span className='pagination'>
          {activePage}/{pageNumbers.length}
        </span>
        {activePage < pageNumbers.length && (
          <article className='pagination'>
            <button aria-label='Next' onClick={() => paginate(activePage + 1)}>
              <span>Next</span>
              <span aria-hidden='true'>&raquo;</span>
            </button>
          </article>
        )}
      </>
    );
  };

  return (
    <div className='pagination'>
      {pageNumbers.length < 10 && pagesLessThanTen()}
      {pageNumbers.length >= 10 && pagesGreaterThanTen()}
    </div>
  );
};

export default Pagination;
