import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GetApi } from "../ApiMethod";
import { productsApi, SearchProductApi, ProductsLimitSkipApi, SortByApi, categoriesApi, CategoryProductsApi } from "../Routes";
import HeroSectionScreen from "../screens/HeroSectionScreen";

const HeroSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = useCallback(async (query, limitParam) => {
    setSearchLoading(true);
    try {
      const apiUrl = query ? SearchProductApi(query, limitParam || limit) : productsApi;
      const data = await GetApi(apiUrl);
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    (async () => {
      try {
        const data = await GetApi(categoriesApi);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    })();
    fetchProducts("");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleApply = async (limitValue) => {
    const numLimit = Number(limitValue) || limit;
    setLimit(numLimit);
    setSearchLoading(true);
    try {
      let apiUrl;
      // Category is the base filter; search + sort + limit are combined with it
      if (selectedCategory) {
        apiUrl = CategoryProductsApi(selectedCategory);
        const params = [];
        if (numLimit > 0) params.push(`limit=${numLimit}`);
        if (sortBy) params.push(`sortBy=${sortBy}&order=${order}`);
        if (params.length > 0) apiUrl += `?${params.join("&")}`;
        const data = await GetApi(apiUrl);
        // If search is also active, filter the results client-side within the category
        let filteredProducts = data.products;
        if (search) {
          const lowerSearch = search.toLowerCase();
          filteredProducts = data.products.filter(
            (p) =>
              p.title.toLowerCase().includes(lowerSearch) ||
              p.description.toLowerCase().includes(lowerSearch)
          );
        }
        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length);
      } else if (search) {
        // Search endpoint supports sortBy and order as query params
        apiUrl = SearchProductApi(search, numLimit);
        if (sortBy) {
          apiUrl += `&sortBy=${sortBy}&order=${order}`;
        }
        const data = await GetApi(apiUrl);
        setProducts(data.products);
        setTotalProducts(data.total);
      } else if (sortBy) {
        apiUrl = SortByApi(sortBy, order);
        if (numLimit > 0) apiUrl += `&limit=${numLimit}`;
        const data = await GetApi(apiUrl);
        setProducts(data.products);
        setTotalProducts(data.total);
      } else if (numLimit > 0) {
        apiUrl = ProductsLimitSkipApi(numLimit, skip);
        const data = await GetApi(apiUrl);
        setProducts(data.products);
        setTotalProducts(data.total);
      } else {
        const data = await GetApi(productsApi);
        setProducts(data.products);
        setTotalProducts(data.total);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSort = (sortValue, orderValue) => {
    setSortBy(sortValue);
    setOrder(orderValue);
  };

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
  };

  const clearFilter = async () => {
    setSelectedCategory("");
    setSortBy("");
    setOrder("");
    setSearch("");
    setLimit(10);
    setSkip(10);
    setSearchLoading(true);
    try {
      const data = await GetApi(productsApi);
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <HeroSectionScreen
      products={products}
      categories={categories}
      loading={loading}
      searchLoading={searchLoading}
      search={search}
      limit={limit}
      skip={skip}
      setSearch={setSearch}
      handleKeyDown={handleKeyDown}
      clearSearch={clearSearch}
      handleApply={handleApply}
      setSkip={setSkip}
      clearFilter={clearFilter}
      navigate={navigate}
      sortBy={sortBy}
      order={order}
      handleSort={handleSort}
      handleCategorySelect={handleCategorySelect}
      selectedCategory={selectedCategory}
    />
  );
};

export default HeroSection;

