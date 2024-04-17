import { AMOUNT, PAGINATION } from "@/constants/constants";

export const getTotalPagesAmount = () => {
  return Math.ceil(AMOUNT.BUYERS / PAGINATION.BUYERS.limit);
};

export const getOffset = (page: number, limit = 20) => {
  return (page - 1) * limit;
};
