import React, { useState, useEffect } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [responseAPI, setResponseAPI] = useState('');

  const searchIngredientAPI = async () => {
    const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
    const response = await getAPI.json();
    return response;
  };

  const searchNameAPI = async () => {
    const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const response = await getAPI.json();
    return response;
  };

  const searchFirstLetterAPI = async () => {
    if (searchValue.length === 1) {
      const getAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      const response = await getAPI.json();
      return response;
    }
    return global.alert('Your search must have only 1 (one) character');
  };

  useEffect(() => {
    switch (selectedOption) {
    case 'Ingredient':
      setResponseAPI(searchIngredientAPI());
      break;
    case 'Name':
      setResponseAPI(searchNameAPI());
      break;
    case 'First letter':
      setResponseAPI(searchFirstLetterAPI());
      break;
    default:
      break;
    }
  }, [responseAPI, searchValue, selectedOption]);

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
      >
        Buscar
      </button>
    </div>
  );
}
