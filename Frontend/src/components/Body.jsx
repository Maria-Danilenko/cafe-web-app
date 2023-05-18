import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/body.module.css';
import Products from './ProductsWrap'
import FavouriteCart from './FavouriteCart';
import useProductFilter from '../hooks/useProductsFilter'
import CategoryFilter from './CategoryFilter';
import {getAllDishes} from '../api/api';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function useDishes(){
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getAllDishes().then(data => setDishes(data));
  }, []);

  return dishes;
}

function useProducts(initialValue) {
  const [products, setProducts] = useLocalStorage('products', initialValue);

  const addProduct = (id) => {
    const existingObjIndex = products.findIndex(product => product.id === id);  
    if (existingObjIndex == -1){      
      setProducts([
        ...products,
        initialValue.find(product=>product.id === id)
      ]);
    }  
  }

  const deleteProduct = (_id) => {
    setProducts(oldProducts => {
      return oldProducts.filter(({id})=>id !== _id)
    })
  }

  return [products, addProduct, deleteProduct];
}

export default function Body() {  
  const dishes = useDishes();
  const [products, addProduct, deleteProduct] = useProducts(dishes);
  const { filteredProducts, filterProducts, resetFilter } = useProductFilter(dishes);
  const categories = [...new Set(dishes.map((product) => product.type_id))];
  const location = useLocation();
  const { key } = location;

  useEffect(() => {
    resetFilter();
  }, [key, resetFilter]);

  return (
    <div className={styles.flex}>
      <CategoryFilter categories={categories} onFilter={filterProducts} onReset={resetFilter} />
      <div className={styles.wrapper}>          
        <Products products={products} addProduct={addProduct} filteredProducts={filteredProducts}/>
        <FavouriteCart products={products} deleteProduct={deleteProduct}/>       
      </div>
    </div>
  )
}