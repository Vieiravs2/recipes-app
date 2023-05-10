import React, { useContext } from 'react';
import { FetchContext } from '../providers/FetchProvider';

const MAX_LENGTH = 5;

export default function ButtonDrinks() {
  const { categoryDrinks } = useContext(FetchContext);
  return (
    <div>
      {
        categoryDrinks.filter((_element, index) => index < MAX_LENGTH).map((category) => (
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
