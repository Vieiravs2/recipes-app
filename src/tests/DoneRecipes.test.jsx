import { screen } from '@testing-library/react';

import renderWithRouter from '../helpers/renderWithRouter';

import LoginProvider from '../providers/LoginProvider';
import FetchProvider from '../providers/FetchProvider';
import App from '../App';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Casos de teste da tela _DoneRecipes_', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  it('Renderiza as receitas feitas corretamente', () => {
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <App />
        </FetchProvider>
      </LoginProvider>,
      '/done-recipes',
    );

    const mealTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    expect(mealTitle).toBeInTheDocument();

    const mealImg = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    expect(mealImg).toBeInTheDocument();

    const drinkImg = screen.getByRole('img', { name: /aquamarine/i });
    expect(drinkImg).toBeInTheDocument();

    const drinkTitle = screen.getByRole('heading', { name: /aquamarine/i });
    expect(drinkTitle).toBeInTheDocument();
  });
});
