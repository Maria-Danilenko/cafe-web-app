import React, { useState, useEffect } from 'react';
import { getDishCount } from '../api/api';
import styles from '../styles/body.module.css';

export default function Footer() {
  const [dishCount, setDishCount] = useState(0);

  const fetchDishCount = async () => {
    const count = await getDishCount();
    setDishCount(count);
  };

  useEffect(() => {
    fetchDishCount();
  }, []);

  return (
    <footer className="border-top text-muted">
      <div className={`${styles.wrapper} my-2 px-2`}>
        <div>©2023, Cafe</div>
        <div>Кількість страв в меню: {dishCount}</div>
      </div>
    </footer>
  );
}