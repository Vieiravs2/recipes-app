import { screen, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import Recipes from '../pages/Recipes';

const serchInput = 'search-input';

describe('Testes no SearchBar', () => {
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

  test('O campo de pesquisa atualiza corretamente o valor digitado', () => {
    render(
      <BrowserRouter>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </BrowserRouter>,
    );
    const searchIcon = screen.getByRole('img', { name: /search-icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(serchInput);
    userEvent.type(searchInput, 'Frango');
    expect(searchInput.value).toBe('Frango');
  });

  test('Os botões de opção são selecionados corretamente', () => {
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

  test('Verifica se a chamada da API é feita com base na opção selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    render(
      <BrowserRouter>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </BrowserRouter>,
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
  });

  test('Verifica a chamada da API com a opção "Name" selecionada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));

    render(
      <BrowserRouter>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </BrowserRouter>,
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

    render(
      <BrowserRouter>
        <LoginProvider>
          <Recipes />
        </LoginProvider>
      </BrowserRouter>,
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
});
