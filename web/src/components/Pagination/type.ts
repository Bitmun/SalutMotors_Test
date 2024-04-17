export interface PaginationProps {
  setPageChange: (pageNumber: number) => void;
  displayPageAmount?: number;
  currentPage: number;
  maxPages: number;
}
