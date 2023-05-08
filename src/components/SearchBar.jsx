import React, { useState } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('Ingredient');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
          type="text"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          checked={ selectedOption === 'Ingredient' }
          onChange={ handleOptionChange }
        />
        Ingredient
      </label>
      <label>
        <input
          type="text"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          checked={ selectedOption === 'Ingredient' }
          onChange={ handleOptionChange }
        />
        Ingredient
      </label>
      <label>
        <input
          type="text"
          data-testid="name-search-radio"
          value="Name"
          checked={ selectedOption === 'Name' }
          onChange={ handleOptionChange }
        />
        Name
      </label>
      <label>
        <input
          type="text"
          data-testid="first-letter-search-radio"
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
