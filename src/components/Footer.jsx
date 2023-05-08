import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <button
        aria-label="Meals"
      >
        <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
      </button>
      <button
        aria-label="Drinks"
      >
        <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}
