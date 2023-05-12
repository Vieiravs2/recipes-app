import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

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
        { stateFavoriteRecipes.map((element, index) => (
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
              Compartilhar
            </button>
            <button data-testid={ `${index}-horizontal-favorite-btn` }>
              Favoritar
            </button>
          </div>
        )) }
      </div>
    </div>
  );
}

// O botão de filtro `All` deve ter o atributo `data-testid="filter-by-all-btn"`;
// * O botão de filtro `Meals` deve ter o atributo `data-testid="filter-by-meal-btn"`;
// * O botão de `Drinks` deve ter o atributo `data-testid="filter-by-drink-btn"`;
// * A imagem do card de receita deve ter o atributo `data-testid="${index}-horizontal-image"`;
// * O texto da categoria da receita deve ter o atributo `data-testid="${index}-horizontal-top-text"`;
// * O texto do nome da receita deve ter o atributo `data-testid="${index}-horizontal-name"`;
// * O elemento de compartilhar a receita deve ter o atributo `data-testid="${index}-horizontal-share-btn"`;
// * O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;
