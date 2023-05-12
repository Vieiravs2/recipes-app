import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [stateFavoriteRecipes, setStateFavoriteRecipes] = useState([]);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    setStateFavoriteRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  return (
    <div className="favorite_recipes_main">
      <Header title="Favorite Recipes" profile search={ false } />
      <div className="buttons_favorite_filter">
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
        {stateFavoriteRecipes.map((element, index) => (
          <div key={ element.id } className="cards_favorite_recipes">
            {element.type === 'meal' ? (
              <>
                <img
                  src={ element.image }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <span data-testid={ `${index}-horizontal-name` }>
                  {element.name}
                </span>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${element.nationality} - ${element.category}`}
                </span>
                <button src={ shareIcon } data-testid={ `${index}-horizontal-share-btn` }>
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img src={ blackHeartIcon } alt="favorite-icon" />
                </button>
              </>
            ) : (
              <>
                <img
                  src={ element.image }
                  alt={ element.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {element.alcoholicOrNot ? element.alcoholicOrNot : 'No'}
                </span>
                <span data-testid={ `${index}-horizontal-name` }>
                  {element.name}
                </span>
                <button src={ shareIcon } data-testid={ `${index}-horizontal-share-btn` }>
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img src={ blackHeartIcon } alt="favorite-icon" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
