import { useCallback } from 'react';

import { useProductsContext } from './ProductsContextProvider';
import { IProduct } from 'models';
import { getProducts } from 'services/products';

const useProducts = () => {
  const {
    isFetching,
    setIsFetching,
    products,
    setProducts,
    filters,
    setFilters,
    searchTerm,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    setSearchTerm,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSortBy,
    
  } = useProductsContext();

  const fetchProducts = useCallback(() => {
    setIsFetching(true);
    // @ts-ignore
    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      setProducts(products);
    });
  }, [setIsFetching, setProducts]);

  const filteredProducts = products.filter(product => {
    // Filtre par catégorie (si des filtres sont sélectionnés)
    const matchesCategory = filters.length === 0 || filters.includes(product.category);
    
    // Filtre par recherche (titre)
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesRating = product.rating.rate >= minRating;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  }).sort((a, b) => {
      if (sortBy === 'lowestprice') {
        return a.price - b.price;
      }
      if (sortBy === 'highestprice') {
        return b.price - a.price;
      }
      if (sortBy === 'toprated') {
        return b.rating.rate - a.rating.rate;
      }
      return 0;
    });

  const filterProducts = (filters: string[]) => {
    setIsFetching(true);
    setFilters(filters);
    

    // @ts-ignore
    getProducts().then((products: IProduct[]) => {
      setIsFetching(false);
      let filteredProducts;

      setFilters(filters);
      // setProducts();
    });
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    isFetching,
    fetchProducts,
    products: filteredProducts,
    filterProducts,
    filters,
    searchTerm,
    maxPrice,
    minPrice,
    minRating,
    handleSearch,
    handlePriceChange: (min: number, max: number) => { setMinPrice(min); setMaxPrice(max); },
    handleRatingChange: (rate: number) => setMinRating(rate),
    handleSortChange: (sort: string) => setSortBy(sort),
  };
};

export default useProducts;
