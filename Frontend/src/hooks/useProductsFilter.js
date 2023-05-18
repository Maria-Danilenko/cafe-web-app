import { useState, useCallback } from 'react';

const useProductFilter = (initialProducts) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const filterProducts = useCallback((type_id) => {
    const newFilteredProducts = initialProducts.filter(
      (product) => product.type_id === type_id
    );
    setFilteredProducts(newFilteredProducts);
  }, [initialProducts]);

  const resetFilter = useCallback(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  return { filteredProducts, filterProducts, resetFilter };
};

export default useProductFilter;