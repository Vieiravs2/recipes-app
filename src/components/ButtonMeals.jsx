import React, { useContext } from 'react';
import { FetchContext } from '../providers/FetchProvider';

const MAX_LENGTH = 5;

export default function ButtonMeals() {
  const {
    setCategoryDrinksAPI,
    setCategoryMealsAPI,
    categoryMeals,
  } = useContext(FetchContext);

  function setTargetCategory({ target }) {
    const { value } = target;
    setCategoryMealsAPI(value);
    setCategoryDrinksAPI('');
  }

  return (
    <div>
      {
        categoryMeals.filter((_element, index) => index < MAX_LENGTH).map((category) => (
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
