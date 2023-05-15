import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import renderWithRouter from '../helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

import LoginProvider from '../providers/LoginProvider';
import FetchProvider from '../providers/FetchProvider';
import RecipesDetails from '../pages/RecipeDetails';

const mockFetch = jest.spyOn(global, 'fetch');
mockFetch.mockResolvedValueOnce({
  json: () => Promise.resolve(oneMeal),
});
mockFetch.mockResolvedValueOnce({
  json: () => Promise.resolve(drinks),
});

describe('Casos de teste da página _RecipeDetails_', () => {
  it('Renderiza as refeições corretamente', async () => {
    const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    renderWithRouter(
      <FetchProvider>
        <LoginProvider>
          <RecipesDetails />
        </LoginProvider>
      </FetchProvider>,
      '/meals/52771',
    );

    screen.debug();

    await act(async () => {
      const title = screen.getByRole('heading', {
        name: /spicy arrabiata penne/i,
      });
      expect(title).toBeInTheDocument();
    });

    expect(global.fetch).toBeCalledWith(ENDPOINT);
  });
});
