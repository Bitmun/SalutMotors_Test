import React, { useState } from "react";
import { PaginationProps } from "./type";
import { AMOUNT } from "@/constants/constants";
import styles from "./Pagination.module.scss";

export const Pagination = ({ displayPageAmount = 10, setPageChange, maxPages, currentPage }: PaginationProps) => {
  const handleMaxLeftClick = () => {
    setPageChange(1);
  };

  const handleLeftClick = () => {
    setPageChange(currentPage - 1);
  };

  const handleRightClick = () => {
    setPageChange(currentPage + 1);
  };

  const handleMaxRightClick = () => {
    setPageChange(maxPages);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const halfDisplayAmount = Math.floor(displayPageAmount / 2);
    let startPage = currentPage - halfDisplayAmount;
    let endPage = currentPage + halfDisplayAmount - 1;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > maxPages) {
      startPage -= endPage - maxPages;
      endPage = maxPages;
    }

    const isFirstPagePresent = startPage === 1;
    const isLastPagePresent = endPage === maxPages;

    for (let page = startPage; page <= endPage; page++) {
      const isCurrentPage = page === currentPage;
      pageButtons.push(
        <button key={page} onClick={() => setPageChange(page)} className={isCurrentPage ? styles.selected : ""}>
          {page}
        </button>
      );
    }

    return (
      <div className={styles.paginationWrapper}>
        <button onClick={handleMaxLeftClick} disabled={isFirstPagePresent}>{`<<`}</button>
        <button onClick={handleLeftClick} disabled={currentPage === 1}>{`<`}</button>
        {pageButtons}
        <button onClick={handleRightClick} disabled={currentPage === maxPages}>{`>`}</button>
        <button onClick={handleMaxRightClick} disabled={isLastPagePresent}>{`>>`}</button>
      </div>
    );
  };

  return renderPageButtons();
};
