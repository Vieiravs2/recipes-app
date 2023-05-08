import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button
        aria-label="Meals"
        onClick={ () => history.push('/meals') }
      >
        <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
      </button>
      <button
        aria-label="Drinks"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}
