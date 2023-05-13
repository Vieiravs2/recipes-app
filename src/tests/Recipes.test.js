import { screen, waitFor } from '@testing-library/react';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';
import { mockMaels } from './mocks/mockMeals';
import { mockMealCategories } from './mocks/mockMealCategory';
// import { mockDrinks } from './mocks/mockDrinks';
// import { mockDrinkCategories } from './mocks/mockDrinkCategoty';

describe('Testa a página de receitas', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMaels),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockMealCategories),
      });
  });

  it('Testa se a página de receitas é renderizada', async () => {
    renderWithRouter(
      <FetchProvider>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </FetchProvider>,
      '/meals',
    );

    await waitFor(() => {
      for (let index = 0; index < 12; index += 1) {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      }
      expect(screen.getByRole('button', { name: /beef/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /breakfast/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /chicken/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dessert/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /goat/i })).toBeInTheDocument();
    });
  });

  // it('testa o filtro de categorias', async () => {
  //   renderWithRouter(
  //     <FetchProvider>
  //       <LoginProvider>
  //         <Recipes />
  //       </LoginProvider>
  //     </FetchProvider>,
  //     '/meals',
  //   );
  //   await waitFor(() => {
  //     const beefButton = screen.getByRole('button', { name: /beef/i });
  //     fireEvent.click(beefButton);
  //     expect(mockFetch).toHaveBeenCalledTimes(3);
  //   });
  // });
});
