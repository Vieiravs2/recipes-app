import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(getRecipes);
  }, []);

  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  return (
    isFavorite ? (
      <button data-testid="favorite-btn">
        <img src={ blackHeartIcon } alt="favorite-recipe" />
      </button>
    ) : (
      <button data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="" />
      </button>
    )
  );
}

export default FavoriteButton;
