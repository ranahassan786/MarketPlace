// ──────────────────────────────────────────────
// Selectors
// ──────────────────────────────────────────────

export const selectProducts = (state) => state.products.products;
export const selectCategories = (state) => state.products.categories;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSearch = (state) => state.products.search;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectLimit = (state) => state.products.limit;
export const selectSkip = (state) => state.products.skip;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectSortBy = (state) => state.products.sortBy;
export const selectOrder = (state) => state.products.order;
export const selectIsLoading = (state) => state.products.status === "loading";