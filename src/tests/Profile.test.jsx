import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';
import FetchProvider from '../providers/FetchProvider';
import LoginProvider from '../providers/LoginProvider';

test('Verifique se a página de comida é renderizada', () => {
  const history = createMemoryHistory();
  history.push('/profile');
  renderWithRouter(
    <LoginProvider>
      <FetchProvider>
        <Profile />
      </FetchProvider>
    </LoginProvider>,
  );

  const profileEl = screen.getByTestId('profile-component');
  expect(profileEl).toBeInTheDocument();
});
