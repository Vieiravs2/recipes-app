import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';

const mockResponse = {
  meals: [
    {
      idMeal: '1',
      strMeal: 'Frango',
    },
  ],
};

const serchInput = 'search-input';
describe('Testes no SearchBar', () => {
  test('Tem os testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
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
  test('O campo de pesquisa atualiza corretamente o valor digitado', () => {
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    expect(searchInput.value).toBe('Frango');
  });
  test('Os botões de opção são selecionados corretamente', () => {
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    const nameIngredient = screen.getByRole('radio', { name: /name/i });
    const firstLatterIngredient = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(radioIngredient);
    expect(radioIngredient.checked).toBe(true);
    expect(nameIngredient.checked).toBe(false);
    expect(firstLatterIngredient.checked).toBe(false);
    userEvent.click(nameIngredient);
    expect(radioIngredient.checked).toBe(false);
    expect(nameIngredient.checked).toBe(true);
    expect(firstLatterIngredient.checked).toBe(false);
    userEvent.click(firstLatterIngredient);
    expect(radioIngredient.checked).toBe(false);
    expect(nameIngredient.checked).toBe(false);
    expect(firstLatterIngredient.checked).toBe(true);
  });
  test('Verifica a chamada da API com a opção "Ingredient" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }));
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const ingredientOption = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(ingredientOption);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Frango',
      );
    });
  });
  test('Verifica a chamada da API com a opção "Name" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }));
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const nameOption = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameOption);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Frango',
      );
    });
  });
  test('Verifica a chamada da API com a opção "First letter" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }));
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'F');
    const firstLetterOption = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterOption);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=F',
      );
    });
  });
  test('Exibe alerta quando a opção "First letter", mais de um caractere', async () => {
    renderWithRouter(
      <LoginProvider>
        <FetchProvider>
          <Recipes />
        </FetchProvider>
      </LoginProvider>,
    );

    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Fr');
    const firstLetterOption = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterOption);
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    userEvent.click(searchButton);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertSpy.mockRestore();
  });
});
