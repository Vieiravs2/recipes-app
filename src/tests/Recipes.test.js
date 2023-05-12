import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';
import { drinks } from '../../cypress/mocks/drinks';
import { meals } from '../../cypress/mocks/meals';
import { mealCategories } from '../../cypress/mocks/mealCategories';
import { drinkCategories } from '../../cypress/mocks/drinkCategories';

describe('Testa a página de receitas', () => {
  it('Testa se a página de receitas é renderizada', async () => {
    renderWithRouter(
      <FetchProvider>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </FetchProvider>,
      '/meals',
    );

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    const mealButton = screen.getByRole('button', { name: /food/i });
    expect(mealButton).toBeInTheDocument();
    const drinkButton = screen.getByRole('button', { name: /drinks/i });
    expect(drinkButton).toBeInTheDocument();
  });
});
