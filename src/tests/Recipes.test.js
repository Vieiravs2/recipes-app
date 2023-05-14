import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';
import fetch from '../../cypress/mocks/fetch';

describe('Testa a página de receitas', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockImplementation(fetch);

    await act(async () => {
      renderWithRouter(
        <FetchProvider>
          <LoginProvider>
            <Recipes />
          </LoginProvider>
        </FetchProvider>,
        '/meals',
      );
    });
  });

  it('testa o filtro da categoria Beef', async () => {
    const ENDPOINT_TO_REQUEST = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';

    await act(async () => {
      const categoryBeef = screen.getByTestId('Beef-category-filter');
      expect(categoryBeef).toBeInTheDocument();
      userEvent.click(categoryBeef);
    });

    expect(global.fetch).toBeCalledWith(ENDPOINT_TO_REQUEST);
  });

  it('testa o se o botão redireciona para pagina Drinks', async () => {
    const ENDPOINT_TO_REQUEST = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    await act(async () => {
      const buttonDrink = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(buttonDrink);
    });

    expect(global.fetch).toBeCalledWith(ENDPOINT_TO_REQUEST);
  });

  it('testa o filtro da categoria Ordinary Drink', async () => {
    const ENDPOINT_TO_REQUEST = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';

    await act(async () => {
      const buttonDrink = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(buttonDrink);
    });

    await act(async () => {
      const categoryOrdinaryDrink = screen.getByTestId('Ordinary Drink-category-filter');
      expect(categoryOrdinaryDrink).toBeInTheDocument();
      userEvent.click(categoryOrdinaryDrink);
    });

    expect(global.fetch).toBeCalledWith(ENDPOINT_TO_REQUEST);
  });
});
