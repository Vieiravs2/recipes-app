import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

import LoginProvider from '../providers/LoginProvider';
import FetchProvider from '../providers/FetchProvider';
import App from '../App';

describe('Casos de teste da página _RecipeDetails_', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockImplementation(fetch);
  });

  it('Renderiza as refeições corretamente', async () => {
    await act(async () => {
      renderWithRouter(
        <FetchProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </FetchProvider>,
        '/meals/52771',
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const mealImg = screen.getByRole('img', { name: /meal/i });
    expect(mealImg).toBeInTheDocument();

    const mealTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    expect(mealTitle).toBeInTheDocument();

    const mealCategory = screen.getByText(/vegetarian/i);
    expect(mealCategory).toBeInTheDocument();

    const mealIngredient1 = screen.getByText(/penne rigate - 1 pound/i);
    expect(mealIngredient1).toBeInTheDocument();

    const mealIngredient8 = screen.getByText(/parmigiano-reggiano - spinkling/i);
    expect(mealIngredient8).toBeInTheDocument();

    const mealVideo = screen.getByTitle(/recipe-video/i);
    expect(mealVideo).toBeInTheDocument();

    const swiperCard1 = screen.getByTestId('0-recommendation-card');
    expect(swiperCard1).toBeVisible();

    const swiperCard2 = screen.getByTestId('1-recommendation-card');
    expect(swiperCard2).toBeVisible();
  });

  it('Renderiza os drinks corretamente', async () => {
    await act(async () => {
      renderWithRouter(
        <FetchProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </FetchProvider>,
        '/drinks/178319',
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const drinkTitle = screen.getByRole('heading', { name: /aquamarine/i });
    expect(drinkTitle).toBeInTheDocument();

    const alcoholic = screen.getByText(/alcoholic/i);
    expect(alcoholic).toBeInTheDocument();

    const drinkIngredient1 = screen.getByText(/hpnotiq - 2 oz/i);
    expect(drinkIngredient1).toBeInTheDocument();

    const drinkIngredient3 = screen.getByText(/banana liqueur - 1 oz/i);
    expect(drinkIngredient3).toBeInTheDocument();

    const drinkDescription = screen.getByText(/shake well in a shaker with ice\. strain in a martini glass\./i);
    expect(drinkDescription).toBeInTheDocument();
  });

  it('Verifica se é possível iniciar uma receita', async () => {
    await act(async () => {
      renderWithRouter(
        <FetchProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </FetchProvider>,
        '/meals/52977',
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const startBtn = screen.getByRole('button', {
      name: /start recipe/i,
    });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);

    const firstIngredient = screen.getByRole('checkbox', { name: /penne rigate - 1 pound/i });
    userEvent.click(firstIngredient);
    expect(firstIngredient).toBeChecked();
  });
});