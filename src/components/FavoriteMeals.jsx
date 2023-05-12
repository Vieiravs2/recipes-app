import React from 'react';

export default function FavoriteMeals() {
  return (
    <div key={ element.id } className="cards_favorite_recipes">
      <img
        src={ element.image }
        alt={ element.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <span data-testid={ `${index}-horizontal-top-text` }>
        {`${element.nationality} - ${element.category}`}
      </span>
      <span data-testid={ `${index}-horizontal-name` }>
        {element.name}
      </span>
      <button data-testid={ `${index}-horizontal-share-btn` }>
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button data-testid={ `${index}-horizontal-favorite-btn` }>
        <img src={ blackHeartIcon } alt="favorite-icon" />
      </button>
    </div>
  );
}
