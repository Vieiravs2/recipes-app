import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcont from '../images/searchIcon.svg';

export default function Header({ title, profile, search }) {
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      { profile
      && <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />}
      { search
      && <img src={ searchIcont } alt="search-icon" data-testid="search-top-btn" />}
      {/* todo: renderização condicional da SearchBar.jsx (req 9) */}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;
