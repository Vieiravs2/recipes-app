import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <button
      data-testid="share-btn"
    >
      <img src={ shareIcon } alt="share-icon" />
    </button>
  );
}

export default ShareButton;
