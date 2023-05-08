import { screen, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import App from '../App';

describe('Casos de teste da página de _Login_', () => {
  it('Testa inputs da página de login', async () => {
    render(
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>,
    );

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button');
    userEvent.type(email, 'email@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(btn);

    const searchBtn = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(searchBtn);
    const searchInput = screen.findByRole('textbox');
    userEvent.type(searchInput, 'teste de input');
    const testeDeInput = screen.findByText('teste de input');

    waitFor(() => expect(testeDeInput).toBeInTheDocument());

    userEvent.click(searchBtn);

    waitFor(() => expect(testeDeInput).not.toBeInTheDocument());

    const profileBtn = screen.getByRole('img', { name: /profile/i });
    userEvent.click(profileBtn);

    const profileTxt = screen.findByRole('heading', { name: /profile/i });
    waitFor(() => expect(profileTxt).toBeInTheDocument());
  });
});
