import { useEffect, useState } from 'react';
import { getTypeByTypeId } from '../api/api';
import styles from '../styles/categoryFilter.module.css'

const CategoryFilter = ({ categories, onFilter, onReset }) => {
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const getCategoryNames = async () => {
      const names = await Promise.all(categories.map(getTypeByTypeId));
      setCategoryNames(names.filter((name, index) => names.indexOf(name) === index));
    };

    getCategoryNames();
  }, [categories]);

  return (
    <div className={`${styles.menu} d-flex flex-column list-group`}>
      <button type="button" className="list-group-item list-group-item-action list-group-item-primary" onClick={onReset}>
        Показати все
      </button>
      {categoryNames.map((name, index) => (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          key={categories[index]}
          onClick={() => onFilter(categories[index])}
        >
          {name} 
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;