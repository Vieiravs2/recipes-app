import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FetchContext } from '../providers/FetchProvider';

export default function FinishRecipeButton() {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const [clicked, setClicked] = useState(false);
  const { ingredientStatus } = useContext(FetchContext);

  useEffect(() => {
    if (ingredientStatus && ingredientStatus.length > 0) {
      console.log(ingredientStatus);
      const filterIngStatus = ingredientStatus
        .filter((ingredient) => ingredient.id === id)[0].status;
      const clickedStatus = filterIngStatus.every((ingredient) => ingredient.clicked);
      setClicked(clickedStatus);
      console.log(clickedStatus);
    }
  }, [id, ingredientStatus]);

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
        disabled={ !clicked }
      >
        Finish Recipe
      </button>
    )
  );
}
