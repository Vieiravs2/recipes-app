import React from 'react';

export default function StartRecipeButton() {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0, zIndex: 1 } }
    >
      Start Recipe
    </button>
  );
}
