import React from 'react';
import { useParams } from 'react-router-dom';

export default function StartRecipeButton() {
  const { id } = useParams();

  let doneRecipesStoraged = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipesStoraged === null) {
    doneRecipesStoraged = [];
  }
  const recipeIsDone = doneRecipesStoraged.some((doneRecipe) => doneRecipe.id === id);

  return (
    !recipeIsDone && (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0, zIndex: 1 } }
      >
        Start Recipe
      </button>
    )
  );
}
