import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, profile, search }) {
  const history = useHistory();

  const redirectProfile = () => {
    history.push('/profile');
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
      && <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />}
      {/* todo: renderização condicional da SearchBar.jsx (req 9) */}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;
