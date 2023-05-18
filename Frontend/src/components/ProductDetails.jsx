import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllDishes, getDishIngredient } from '../api/api';
import styles from '../styles/productDetails.module.css'

const dishImgId = {
  1: 'https://focus.ua/static/storage/thumbs/1088x/0/bb/1d6a53de-c72a745d96916983bef0b1236f40abb0.jpg',
  2: 'https://t3.ftcdn.net/jpg/04/59/57/74/360_F_459577427_J1bp4PgaJ3oiFMBKOmZq8Xul1IgDjzVr.jpg',
  3: 'https://images.unian.net/photos/2023_05/thumb_files/1000_545_1683701644-7407.jpg',
  4: 'https://static.1000.menu/res/640/img/content-v2/eb/79/19516/salat-cezar-klassicheskii-s-kuricei_1611309331_16_max.jpg',
  5: 'https://kofella.net/images/stories/vseokofe/kofe-amerikano-chto-eto-takoye.jpg',
  6: 'https://img.depo.ua/745xX/Apr2018/389046.jpg',
  7: 'https://uniquecafes.com.br/wp-content/uploads/2021/08/Destaque-cafe-Latte.jpg',
  8: 'https://s7d1.scene7.com/is/image/mcdonalds/Porridge-plain-1:1-3-product-tile-desktop?wid=829&hei=513&dpr=off',
  9: 'https://shuba.life/static/content/thumbs/1480x986/0/a5/w6lxcl---c2000x1332x0sx6s-c2000x1332x0sx6s-up--9319206e2782997e62c0373fc77f8a50.jpg',
  10: 'https://shuba.life/static/content/thumbs/1200x630/f/e6/tt4icn---c1200x630x50px50p-c1200x630x50px50p-up--ab7cd23b841dcb049ac79d55ffd25e6f.jpg',
  11: 'https://i.obozrevatel.com/food/recipemain/2019/9/11/apelsinovyj-sok5-1.jpg?size=636x424',
  12: 'https://static.tildacdn.com/tild6634-3961-4262-b239-373332623765/__250.jpg',
  13: 'https://tekhnolog.com/wp-content/uploads/2018/03/Tartar-iz-tuntsa.jpg',
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await getAllDishes();
      const product = products.find(p => p.id === parseInt(id));
      setProduct(product);
      const ingredientData = await getDishIngredient(id);
      setIngredients(ingredientData);
    }
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const priceInUAH = product.price;
  const priceInUSD = (product.price / 36.57).toFixed(2);

  return (
    <div className={styles.flex}>
      <div className='border-end border-2'>
        <div className={styles.wrapper}>
          <div key={product.id}>
            <div className={`${styles.leftText}`}>
              <h2 className='border-bottom border-2 '>{product.name}</h2>
              <h5>Ціна: {priceInUAH}₴</h5>
              <h5>&emsp; &emsp; {priceInUSD}$</h5>
              <br />
              <h5>Інгредієнти:</h5>
              <div>
                {ingredients.map((ingredient, index) => (
                  <ul className={`${styles.ul} fs-5`} key={index} >
                    <li>{ingredient}</li>
                  </ul>
                ))}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className='m-auto'>
        <img className={`${styles.img} rounded`} src={dishImgId[product.id]} alt="dishImg" />
      </div>
    </div>
  );
}