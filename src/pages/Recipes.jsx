import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FetchContext } from '../providers/FetchProvider';

const MAX_LENGTH = 12;

export default function Recipes() {
  const { responseAPI, setResponseAPI } = useContext(FetchContext);

  const location = useLocation();
  const { pathname } = location;
  console.log(responseAPI);

  useEffect(() => {
    async function fetchData() {
      if (pathname === '/meals') {
        const getAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const response = await getAPI.json();
        setResponseAPI(response[pathname.substring(1)]);
      }
      if (pathname === '/drinks') {
        const getAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await getAPI.json();
        setResponseAPI(response[pathname.substring(1)]);
      }
    }
    fetchData();
  }, [pathname, setResponseAPI]);

  return (
    <>
      <Header
        title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        profile
        search
      />
      {pathname === '/drinks' && responseAPI
        .filter((_response, index) => index < MAX_LENGTH).map((el, index) => (
          <article data-testid={ `${index}-recipe-card` } key={ el.strDrink }>
            <img
              src={ el.strDrinkThumb }
              alt="drink-thumb"
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>{el.strDrink}</span>
          </article>
        ))}
      {pathname === '/meals' && responseAPI
        .filter((_response, index) => index < MAX_LENGTH).map((el, index) => (
          <article data-testid={ `${index}-recipe-card` } key={ el.strMeal }>
            <img
              src={ el.strMealThumb }
              alt="meal-thumb"
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>{el.strMeal}</span>
          </article>
        ))}
      <Footer />
    </>
  );
}
