import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';
import { drinks } from '../../cypress/mocks/drinks';
import { meals } from '../../cypress/mocks/meals';
import { mealCategories } from '../../cypress/mocks/mealCategories';

describe('Testa a página de receitas', () => {
//   jest.spyOn(global, 'fetch').mockResolvedValue({
//     json: jest.fn().mockResolvedValue(mealCategories),
//   });

  it('Testa se a página de receitas é renderizada', async () => {
    renderWithRouter(
      <FetchProvider>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </FetchProvider>,
      '/meals',
    );

    screen.debug();

    const beefButton = screen.getByRole('button', { name: /beef/i });
    expect(beefButton).toBeInTheDocument();
  });
});
