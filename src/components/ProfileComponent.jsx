import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function ProfileComponent() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handlerLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <div data-testid="profile-component">
      <Header title="Profile" profile search={ false } />
      <section>
        <h5 data-testid="profile-email">{user.email}</h5>
      </section>
      <section>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>

        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => handlerLogout() }
          >
            Logout
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
