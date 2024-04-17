export const AMOUNT = {
  BUYERS: 5000,
} as const satisfies Record<string, number>;

export const PAGINATION = {
  BUYERS: {
    limit: 20,
    breakdown: 10,
  },
};
