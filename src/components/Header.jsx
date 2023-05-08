import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, profile, search }) {
  const history = useHistory();
  const [searchInputEnable, setSearchInputEnable] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const redirectProfile = () => {
    history.push('/profile');
  };

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button onClick={ redirectProfile } aria-label="Abrir perfil">
        {profile && (
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        )}
      </button>
      { search
      && (
        <button
          onClick={ () => setSearchInputEnable(!searchInputEnable) }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {
        searchInputEnable
          && <input
            type="text"
            data-testid="search-input"
            value={ searchValue }
            onChange={ handleChange }
          />
      }
      {' '}

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;
