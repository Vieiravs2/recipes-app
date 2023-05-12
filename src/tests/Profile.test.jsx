import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';

test('Verifique se a página de comida é renderizada', () => {
  const history = createMemoryHistory();
  history.push('/profile');
  render(
    <Router history={ history }>
      <Profile />
    </Router>,
  );

  const profileEl = screen.getByTestId('profile-component');

  expect(profileEl).toBeInTheDocument();
});
