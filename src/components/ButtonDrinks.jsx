import React, { useContext } from 'react';
import { FetchContext } from '../providers/FetchProvider';

const MAX_LENGTH = 5;

export default function ButtonDrinks() {
  const {
    setCategoryDrinksAPI,
    categoryDrinks,
    setCategoryMealsAPI,
  } = useContext(FetchContext);

  function setTargetCategory({ target }) {
    const { value } = target;
    setCategoryDrinksAPI(value);
    setCategoryMealsAPI('');
  }

  return (
    <div>
      {
        categoryDrinks.filter((_element, index) => index < MAX_LENGTH).map((category) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            value={ category.strCategory }
            onClick={ (event) => setTargetCategory(event) }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
