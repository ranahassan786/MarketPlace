import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories , fetchProducts } from "./productService";

const initialState = {
  products: [],
  categories: [],
  status: "idle",
  error: null,
  search: "",
  selectedCategory: "",
  limit: 10,
  skip: 10,
  totalProducts: 0,
  sortBy: "",
  order: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setSkip(state, action) {
      state.skip = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.selectedCategory = "";
      state.sortBy = "";
      state.order = "";
      state.limit = 10;
      state.skip = 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setSearch,
  setSelectedCategory,
  setLimit,
  setSkip,
  setSortBy,
  setOrder,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
