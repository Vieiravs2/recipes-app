import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchContext } from '../providers/FetchProvider';

const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

export default function SearchBar() {
  const { setResponseAPI } = useContext(FetchContext);

  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [drinksOrMeals, setDrinksOrMeals] = useState('');

  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    console.log(pathname);
    if (pathname === '/meals') {
      setEndpoint(URL_MEALS);
      setDrinksOrMeals('meals');
    } else if (pathname === '/drinks') {
      setEndpoint(URL_DRINKS);
      setDrinksOrMeals('drinks');
    }
  }, [pathname]);

  const fetchData = useCallback(async () => {
    let response;
    switch (selectedOption) {
    case 'Ingredient': {
      const getAPI = await fetch(`${endpoint}filter.php?i=${searchValue}`);
      response = await getAPI.json();
      break;
    }
    case 'Name': {
      const getAPI = await fetch(`${endpoint}search.php?s=${searchValue}`);
      response = await getAPI.json();
      break;
    }
    case 'First letter': {
      if (searchValue.length === 1) {
        const getAPI = await fetch(`${endpoint}search.php?f=${searchValue}`);
        response = await getAPI.json();
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    }
    default:
    }

    if (response && response.meals && response.meals.length === 1) {
      history.push(`/meals/${response.meals[0].idMeal}`);
    } else if (response && response.drinks && response.drinks.length === 1) {
      history.push(`/drinks/${response.drinks[0].idDrink}`);
    } else {
      setResponseAPI(response[drinksOrMeals]);
    }
  }, [searchValue, selectedOption, endpoint, history, setResponseAPI, drinksOrMeals]);

  const handleOptionChange = ({ target }) => {
    const { value } = target;
    setSelectedOption(value);
  };

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ searchValue }
        onChange={ handleChange }
      />
      <label>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="option"
          value="Ingredient"
          checked={ selectedOption === 'Ingredient' }
          onChange={ handleOptionChange }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          data-testid="name-search-radio"
          name="option"
          value="Name"
          checked={ selectedOption === 'Name' }
          onChange={ handleOptionChange }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="option"
          value="First letter"
          checked={ selectedOption === 'First letter' }
          onChange={ handleOptionChange }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ fetchData }
      >
        Buscar
      </button>
    </div>
  );
}
