import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [responseAPI, setResponseAPI] = useState('');
  const [endpoint, setEndpoint] = useState('');

  const history = useHistory();
  const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
  const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const { pathname } = history.location;

  useEffect(() => {
    console.log(pathname);
    if (pathname === '/meals') {
      setEndpoint(URL_MEALS);
    } else if (pathname === '/drinks') {
      setEndpoint(URL_DRINKS);
    }
  }, [pathname]);

  const redirectDatails = useCallback(() => {
    if (responseAPI.meals.length === 1) {
      return history.push(`/meals/${responseAPI.meals[0].idMeal}`);
    } if (responseAPI.drinks.length === 1) {
      return history.push(`/drinks/${responseAPI.drinks[0].idDrink}`);
    }
  }, [history, responseAPI]);

  useEffect(() => {
    redirectDatails();
  }, [responseAPI, redirectDatails]);

  const fetchData = useCallback(async () => {
    switch (selectedOption) {
    case 'Ingredient': {
      const getAPI = await fetch(`${endpoint}filter.php?i=${searchValue}`);
      const response = await getAPI.json();
      setResponseAPI(response);
      break;
    }
    case 'Name': {
      const getAPI = await fetch(`${endpoint}search.php?s=${searchValue}`);
      const response = await getAPI.json();
      setResponseAPI(response);
      break;
    }
    case 'First letter': {
      if (searchValue.length === 1) {
        const getAPI = await fetch(`${endpoint}search.php?f=${searchValue}`);
        const response = await getAPI.json();
        return response;
      }
      return global.alert('Your search must have only 1 (one) character');
    }
    default:
      break;
    }
  }, [searchValue, selectedOption, endpoint]);

  const handleOptionChange = ({ target }) => {
    const { value } = target;
    setSelectedOption(value);
  };

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  console.log(responseAPI);

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
