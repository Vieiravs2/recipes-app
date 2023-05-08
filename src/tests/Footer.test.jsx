import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from '../providers/LoginProvider';
import App from '../App';

describe('Casos de testes do Footer', () => {
  it('renderiza o footer corretamente', () => {
    render(
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>,
    );

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const btn = screen.getByRole('button');
    userEvent.type(emailInput, 'email@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btn);

    const mealBtn = screen.getByAltText('meal-icon');
    expect(mealBtn).toBeInTheDocument();

    const drinkBtn = screen.getByAltText('drink-icon');
    expect(drinkBtn).toBeInTheDocument();
  });
});
