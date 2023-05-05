import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../providers/LoginProvider';
import App from '../App';

describe('Casos de teste da página de _Login_', () => {
  it('Testa inputs da página de login', () => {
    render(
      <LoginProvider>
        <App />
      </LoginProvider>,
    );

    const email = screen.getByRole('textbox');
    expect(email).toBeInTheDocument();

    const password = screen.getByPlaceholderText(/senha/i);
    expect(password).toBeInTheDocument();

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();

    userEvent.type(email, 'email@test.com');
    userEvent.type(password, '1234567');
    expect(btn).toBeEnabled();
  });
});
