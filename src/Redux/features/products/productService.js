import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetApi } from "../../../util/ApiMethod";
import { categoriesApi, productsApi } from "../../../util/Routes";
import { fetchProductsHelper } from "./productHelpers";

export const fetchCategories = GetApi({
  name: "products/fetchCategories",
  url: categoriesApi,
});

export const fetchProducts = GetApi({
 name: "products/fetchProducts",
  url: productsApi,
});