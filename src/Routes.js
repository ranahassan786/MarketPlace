const BASE_URL = "https://dummyjson.com";

const loginApi = `${BASE_URL}/auth/login`;
const userApi = `${BASE_URL}/auth/me`;
const productsApi = `${BASE_URL}/products`;
const categoriesApi = `${BASE_URL}/products/categories`;
const CategoryProductsApi = (slug) => `${BASE_URL}/products/category/${slug}`;
const SingleProductApi = (id) => `${BASE_URL}/products/${id}`;
const SearchProductApi = (query, limit) =>`${BASE_URL}/products/search?q=${query}&limit=${limit}`;
const ProductsLimitSkipApi = (limit, skip) => `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
const SortByApi=(sortBy, order = "asc") =>`${BASE_URL}/products?sortBy=${sortBy}&order=${order}`;

export { BASE_URL, loginApi, userApi, productsApi, categoriesApi, CategoryProductsApi, SingleProductApi, SearchProductApi, ProductsLimitSkipApi, SortByApi };
