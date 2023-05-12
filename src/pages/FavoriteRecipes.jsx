import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

export default function FavoriteRecipes() {
  const [stateFavoriteRecipes, setStateFavoriteRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareLink = (category, id) => {
    const link = `http://localhost:3000/${category}/${id}`;
    console.log('Esse é o link', link);
    copy(link);
    setTimeout(() => setLinkCopied(false), TWO_SECONDS);
    setLinkCopied(true);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setStateFavoriteRecipes(favoriteRecipes);
  }, []);

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
                <button onClick={ () => shareLink('meals', element.id) }>
                  <img
                    src={ shareIcon }
                    alt="share-icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                { linkCopied }
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img src={ blackHeartIcon } alt="favorite-icon" />
                </button>
                {linkCopied && <span>Link copied!</span>}
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
                <button onClick={ () => shareLink('drinks', element.id) }>
                  <img
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="share-icon"
                  />
                </button>
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img src={ blackHeartIcon } alt="favorite-icon" />
                </button>
                {linkCopied && <span>Link copied!</span>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
