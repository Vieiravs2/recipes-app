import React, { useState, useEffect, useCallback } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [responseAPI, setResponseAPI] = useState('');

  const fetchData = useCallback(async () => {
    switch (selectedOption) {
    case 'Ingredient': {
      const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      const response = await getAPI.json();
      setResponseAPI(response);
      break;
    }
    case 'Name': {
      const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const response = await getAPI.json();
      setResponseAPI(response);
      break;
    }
    case 'First letter': {
      if (searchValue.length === 1) {
        const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
        const response = await getAPI.json();
        return response;
      }
      return global.alert('Your search must have only 1 (one) character');
    }
    default:
      break;
    }
  }, [searchValue, selectedOption]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
