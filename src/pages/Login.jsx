import { useContext } from 'react';
import { LoginContext } from '../providers/LoginProvider';

const MAX_LENGTH = 6;

function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isFormValid = emailRegex.test(email) && password.length > MAX_LENGTH;

  return (
    <main>
      <form>
        <input
          type="text"
          name=""
          id=""
          data-testid="email-input"
          placeholder="Coloque seu e-mail"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
        <input
          type="password"
          name=""
          id=""
          data-testid="password-input"
          placeholder="Senha"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
        />
        <button type="submit" data-testid="login-submit-btn" disabled={ !isFormValid }>
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
