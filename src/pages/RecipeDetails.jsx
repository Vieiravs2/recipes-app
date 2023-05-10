import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const URL_MEALS_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINKS_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export default function RecipesDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const { id } = useParams();

  const endpoint = pathname.includes('/meals') ? URL_MEALS_DETAILS : URL_DRINKS_DETAILS;

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetch(`${endpoint}${id}`);
      const data = await response.json();
      return data;
    }
    fetchDetails();
  }, [endpoint, id]);

  return (
    <div>RecipesDetails</div>
  );
}
