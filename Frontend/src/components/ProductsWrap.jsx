import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/productsWrap.module.css';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: black;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function convertToUSD(priceInUAH) {
  const exchangeRate = 36.57;
  return (priceInUAH / exchangeRate).toFixed(2);
}

export default function Products(props) {
  function isProductFavourite(productId){
    const isProductAdded = props.products.some((product) => product.id === productId);
    return isProductAdded;
  }
  
  function getButtonText(productId) {
    return isProductFavourite(productId) ? 'В улюбленому' : ' В улюблене';
  }

  function getButtonColor(productId) {
    return isProductFavourite(productId) ? 'secondary' : 'primary';
  }

  function getButtonDisabled(productId) {
    return isProductFavourite(productId) ? true : false;
  }

  return (   
  <div className={styles.main}>
    <div className={styles.sdFoodScreenMain}>
      {props.filteredProducts.map((element) => (
        <div className={`border border-2 rounded ${styles.sdFoodBoxes}`} key={element.id}>
          <StyledLink className={styles.textContainer} to={`/products/${element.id}`}>{element.name}</StyledLink>
          <br />
          <p>{`${element.price}₴`}</p>
          <p>{`${convertToUSD(element.price)}$`}</p>
          <button
            type="button"
            className={`btn btn-${getButtonColor(element.id)} mt-2 ${styles.addProductBtn}`}
            onClick={() => props.addProduct(element.id)}
            disabled={getButtonDisabled(element.id)}>
            {getButtonText(element.id)} </button>
        </div>
      ))}
    </div>
  </div>
  )
}