import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const URL_MEALS_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINKS_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const MEALS_SUBSTRING = 6;
const DRINKS_SUBSTRING = 7;

export default function RecipesDetails() {
  const [recipe, setRecipe] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const { id } = useParams();

  const endpoint = pathname.includes('/meals') ? URL_MEALS_DETAILS : URL_DRINKS_DETAILS;
  const mealsOrDrinks = pathname.includes('/drinks') ? DRINKS_SUBSTRING : MEALS_SUBSTRING;

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetch(`${endpoint}${id}`);
      const data = await response.json();
      setRecipe(data[pathname.substring(1, mealsOrDrinks)]);
    }
    fetchDetails();
    const ingredients = Object.entries(recipe).filter(([key, value]) => key.includes('strIngredient'));
    console.log(ingredients);
  }, [endpoint, id, pathname, mealsOrDrinks, recipe]);


  return (
    <main>
      {pathname.includes('/meals') && recipe.map((el) => (
        <div key={ el.strMeal }>
          <img src={ el.strMealThumb } alt="meal" data-testid="recipe-photo" />
          <h3 data-testid="recipe-title">{el.strMeal}</h3>
          <p data-testid="recipe-category">{el.strCategory}</p>
          <div>
            {el.strIngredient1 && el.strMeasure1 && (
              <p
                data-testid="1-ingredient-name-and-measure"
              >
                {`${el.strIngredient1} - ${el.strMeasure1}`}
              </p>
            )}
            {el.strIngredient2 && el.strMeasure2 && (
              <p
                data-testid="2-ingredient-name-and-measure"
              >
                {`${el.strIngredient2} - ${el.strMeasure2}`}
              </p>
            )}
            {el.strIngredient3 && el.strMeasure3 && (
              <p
                data-testid="3-ingredient-name-and-measure"
              >
                {`${el.strIngredient3} - ${el.strMeasure3}`}
              </p>
            )}
            {el.strIngredient4 && el.strMeasure4 && (
              <p
                data-testid="4-ingredient-name-and-measure"
              >
                {`${el.strIngredient4} - ${el.strMeasure4}`}
              </p>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
