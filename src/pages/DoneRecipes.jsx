import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getRecipesFromLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(getRecipesFromLocalStorage);
  }, []);

  return (
    <main>
      <Header title="Done Recipes" profile search={ false } />
      <section className="done__btn">
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      {doneRecipes.map((recipe, index) => (
        <article className="done__card" key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </span>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <div>
            {recipe.tags.map((tag) => (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </span>
            ))}
          </div>
          <button>
            <img
              src={ shareIcon }
              alt="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </article>
      ))}
    </main>
  );
}
