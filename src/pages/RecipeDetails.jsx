import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const URL_MEALS_DETAILS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/';
const MEALS_SUBSTRING = 6;
const DRINKS_SUBSTRING = 7;
const MAX_RECOMMENDATIONS = 6;

export default function RecipesDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recommedations, setRecommendations] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  const { id } = useParams();

  const endpoint = pathname.includes('/meals') ? URL_MEALS_DETAILS : URL_DRINKS_DETAILS;
  const mealsOrDrinks = pathname.includes('/drinks') ? DRINKS_SUBSTRING : MEALS_SUBSTRING;
  const invertedEndpoint = pathname.includes('/meals')
    ? URL_DRINKS_DETAILS : URL_MEALS_DETAILS;
  const invertPathname = pathname.includes('/meals') ? 'drinks' : 'meals';

  useEffect(() => {
    async function fetchDetails() {
      const responseDetails = await fetch(`${endpoint}lookup.php?i=${id}`);
      const dataDet = await responseDetails.json();

      const responseRecommedations = await fetch(`${invertedEndpoint}search.php?s=`);
      const dataRecom = await responseRecommedations.json();

      setRecommendations(dataRecom[invertPathname]);
      setRecipe(dataDet[pathname.substring(1, mealsOrDrinks)]);
    }
    fetchDetails();
  }, [endpoint, id, pathname, mealsOrDrinks, invertedEndpoint, invertPathname]);

  console.log(recommedations);

  return (
    <main>
      {pathname.includes('/meals') && recipe.map((el) => (
        <div key={ el.strMeal }>
          <img src={ el.strMealThumb } alt="meal" data-testid="recipe-photo" />
          <h3 data-testid="recipe-title">{el.strMeal}</h3>
          <p data-testid="recipe-category">{el.strCategory}</p>
          <div>
            {Object.keys(el).map((key) => {
              if (key.startsWith('strIngredient') && el[key]) {
                const ingredientNumber = key.slice('strIngredient'.length);
                const measureKey = `strMeasure${ingredientNumber}`;
                const formattedString = `${el[key]} - ${el[measureKey]}`;
                return (
                  <p
                    key={ key }
                    data-testid={ `${ingredientNumber - 1}-ingredient-name-and-measure` }
                  >
                    {formattedString}
                  </p>
                );
              }
              return null;
            })}
          </div>
          <p data-testid="instructions">{el.strInstructions}</p>
          <iframe src={ el.strYoutube } title="recipe-video" data-testid="video" />
        </div>
      ))}
      {pathname.includes('/drinks') && recipe.map((el) => (
        <div key={ el.strDrink }>
          <img src={ el.strMealThumb } alt="drink" data-testid="recipe-photo" />
          <h3 data-testid="recipe-title">{el.strDrink}</h3>
          <p data-testid="recipe-category">{el.strAlcoholic}</p>
          <div>
            {Object.keys(el).map((key) => {
              if (key.startsWith('strIngredient') && el[key]) {
                const ingredientNumber = key.slice('strIngredient'.length);
                const measureKey = `strMeasure${ingredientNumber}`;
                const formattedString = `${el[key]} - ${el[measureKey]}`;
                return (
                  <p
                    key={ key }
                    data-testid={ `${ingredientNumber - 1}-ingredient-name-and-measure` }
                  >
                    {formattedString}
                  </p>
                );
              }
              return null;
            })}
          </div>
          <p data-testid="instructions">{el.strInstructions}</p>
        </div>
      ))}
      { pathname.includes('/meals') && (
        <Swiper
          spaceBetween={ 30 }
          slidesPerView={ 2 }
          // modules={ [Pagination] }
        >
          {recommedations
            .filter((_el, index) => index < MAX_RECOMMENDATIONS)
            .map((recommedation, index) => (
              <SwiperSlide key={ recommedation.strDrink }>
                <div data-testid={ `${index}-recommendation-card` }>
                  <img src={ recommedation.srtDrinkThumb } alt="drink-thumb" />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {recommedation.strDrink}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      { pathname.includes('/drinks') && (
        <Swiper
          spaceBetween={ 30 }
          slidesPerView={ 2 }
        >
          {recommedations
            .filter((_el, index) => index < MAX_RECOMMENDATIONS)
            .map((recommedation, index) => (
              <SwiperSlide key={ recommedation.strMeal }>
                <div data-testid={ `${index}-recommendation-card` }>
                  <img src={ recommedation.srtMealThumb } alt="drink-thumb" />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {recommedation.strMeal}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </main>
  );
}
