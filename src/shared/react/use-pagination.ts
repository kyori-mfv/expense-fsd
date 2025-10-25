import { useState } from "react";

/**
 * Reusable pagination hook
 * Provides pagination state and navigation methods
 */

interface UsePaginationReturn {
  currentPage: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
  goToPage: (page: number, totalPages: number) => void;
}

export function usePagination(initialPage = 1): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const resetPage = () => {
    setCurrentPage(initialPage);
  };

  const goToPage = (page: number, totalPages: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  return {
    currentPage,
    setPage,
    nextPage,
    prevPage,
    resetPage,
    goToPage,
  };
}
