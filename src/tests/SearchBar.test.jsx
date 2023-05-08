import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';

describe('Testes no SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolved({
      json: jest.fn().mockResolved(),
    });
  });
  test('Tem os testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    render(
      <BrowserRouter>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </BrowserRouter>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const nameIngredient = screen.getByRole('radio', { name: /name/i });
    const firstLatterIngredient = screen.getByRole('radio', { name: /first letter/i });
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    expect(radioIngredient).toBeDefined();
    expect(nameIngredient).toBeDefined();
    expect(firstLatterIngredient).toBeDefined();
    expect(searchButton).toBeDefined();
  });
});
