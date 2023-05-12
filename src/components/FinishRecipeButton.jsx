import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function FinishRecipeButton() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  let doneRecipesStoraged = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipesStoraged === null) {
    doneRecipesStoraged = [];
  }
  const recipeIsDone = doneRecipesStoraged.some((doneRecipe) => doneRecipe.id === id);

  return (
    !recipeIsDone && pathname.includes('progress') && (
      <button
        type="button"
        data-testid="finish-recipe-btn"
        style={ { position: 'fixed', bottom: 0, zIndex: 1 } }
      >
        Finish Recipe
      </button>
    )
  );
}
