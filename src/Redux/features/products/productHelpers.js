import { GetApi } from "../../../util/ApiMethod";
import {
  productsApi,
  SearchProductApi,
  ProductsLimitSkipApi,
  SortByApi,
  categoriesApi,
  CategoryProductsApi,
} from "../../../util/Routes";

export const buildProductUrl = (params = {}) => {
  const { search = "", category = "", limit = 10, skip = 10, sortBy = "", order = "" } = params;

  if (category) {
    let apiUrl = CategoryProductsApi(category);
    const queryParams = [];
    if (limit > 0) queryParams.push(`limit=${limit}`);
    if (sortBy) queryParams.push(`sortBy=${sortBy}&order=${order}`);
    if (queryParams.length > 0) apiUrl += `?${queryParams.join("&")}`;
    return apiUrl;
  }

  if (search) {
    let apiUrl = SearchProductApi(search, limit);
    if (sortBy) apiUrl += `&sortBy=${sortBy}&order=${order}`;
    return apiUrl;
  }

  if (sortBy) {
    let apiUrl = SortByApi(sortBy, order);
    if (limit > 0) apiUrl += `&limit=${limit}`;
    return apiUrl;
  }

  if (limit > 0) {
    return ProductsLimitSkipApi(limit, skip);

   
  }

  return productsApi;
};

export const processProductResponse = (data, params = {}) => {
  const { search = "", category = "" } = params;

  // Client-side search filtering when both category and search params are present
  if (category && search) {
    const lowerSearch = search.toLowerCase();
    const filteredProducts = data.products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
    );
    return {
      products: filteredProducts,
      total: filteredProducts.length,
    };
  }

  return { products: data.products, total: data.total };
};

export const fetchProductsHelper = async (params = {}, { rejectWithValue }) => {
  try {
    return await fetchProductsHelper(params);
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

