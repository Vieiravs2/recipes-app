import React, { useContext, useEffect } from 'react';
import { FetchContext } from '../providers/FetchProvider';

export default function RecipeInProgress() {
  const { recipe } = useContext(FetchContext);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div className="main_recipe_progress">
      <h1>{recipe[0]?.strMeal}</h1>
    </div>
  );
}
