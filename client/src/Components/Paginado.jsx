import React from 'react';

import { usePagination, DOTS } from './usePagination';
import styles from './pagination.css';
const Paginado = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    /* className */
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  console.log(paginationRange  )

  // If there are less than 2 times in pagination range we shall not render the component
  /* if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  } */

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={styles.container}
    >
       {/* Left navigation arrow identar este boton por id para despues  cuando la pag sea la 1 que se ocuullte el boton */}
       {currentPage ===1  ? 
       null
       :
      <button
        className={styles.container__item}
        onClick={onPrevious}
      >
        <div className={styles.left} />
      </button>
      }
      {
      
      paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {

          return <button className={styles.container__item}>&#8230;</button>;
        }
        
		
        // Render our Page Pills
      

         return (
           <button
             className={styles.container__item}
             onClick={() => onPageChange(pageNumber)}
           >
             {pageNumber}
           </button>
         );
       
      })}
      {/*  Right Navigation arrow */}
      {
        currentPage !== lastPage ?
      <button
        className={styles.container__item}
        onClick={onNext}
      >
        <div className={styles.rigth} />
      </button>
: null
      }
    </ul>
  );
};

export default Paginado;

