import React from 'react';
import RecipesDetails from './RecipeDetails';
import FinishRecipeButton from '../components/FinishRecipeButton';

export default function RecipeInProgress() {
  return (
    // <div>RecipeInProgress</div>
    <>
      <RecipesDetails />
      <FinishRecipeButton />
    </>
  );
}
