import React, { useContext } from 'react';
import { FetchContext } from '../providers/FetchProvider';

const MAX_LENGTH = 5;

export default function ButtonMeals() {
  const { categoryMeals } = useContext(FetchContext);
  return (
    <div>
      {
        categoryMeals.filter((_element, index) => index < MAX_LENGTH).map((category) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
