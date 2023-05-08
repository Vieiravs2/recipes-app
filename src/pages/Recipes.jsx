import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Header
        title={ pathname === '/meals' ? 'Meals' : 'Drinks' }
        profile
        search
      />
      <Footer />
    </>
  );
}
