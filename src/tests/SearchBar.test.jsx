import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';

const serchInput = 'search-input';
describe.skip('Testes no SearchBar', () => {
  test('Tem os testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    renderWithRouter(
      <LoginProvider>
        <Recipes />
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
        <Recipes />
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
        <Recipes />
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
  test('Verifica a chamada da API com a opção "Name" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));
    renderWithRouter(
      <LoginProvider>
        <Recipes />
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const nameIngredient = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameIngredient);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'search.php?s=Frango',
      );
    });
  });
  test('Verifica a chamada da API com a opção "First letter" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));
    renderWithRouter(
      <LoginProvider>
        <Recipes />
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'F');
    const firstLatterIngredient = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLatterIngredient);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'search.php?f=F',
      );
    });
  });
  test('Verifica se o endpoint correto é usado quando a rota é "/drinks"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));
    renderWithRouter(
      <LoginProvider>
        <MemoryRouter initialEntries={ ['/drinks'] }>
          <Recipes />
        </MemoryRouter>
      </LoginProvider>,
    );

    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Frango',
      );
    });
  });

  test('Sua pesquisa deve ter apenas 1 caractere "First Letter, selecionado " ', () => {
    global.alert = jest.fn();
    renderWithRouter(
      <LoginProvider>
        <Recipes />
      </LoginProvider>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const firstLetterOption = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterOption);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Redireciona para pagina pesquisa e retorna apenas uma refeição', async () => {
    const response = {
      meals: [
        { idMeal: '52772' },
      ],
    };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    const { history } = renderWithRouter(
      <LoginProvider>
        <Recipes />
      </LoginProvider>,
      { route: '/meals' },
    );

    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'filter.php?i=Frango',
      );
    });
    expect(history.location.pathname).toBe('/meals/52772');
  });

  test('Redireciona para pagina pesquisa e retorna apenas uma drink', async () => {
    const resposta = {
      drinks: [
        { idDrink: '11007' },
      ],
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(resposta),
    }));

    const { history } = renderWithRouter(
      <LoginProvider>
        <Recipes />
      </LoginProvider>,
      { route: '/drinks' },
    );

    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Martini');
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'filter.php?i=Martini',
      );
    });
    expect(history.location.pathname).toBe('/drinks/11007');
  });
});
