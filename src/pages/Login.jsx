function Login() {
  return (
    <main>
      <form>
        <input
          type="text"
          name=""
          id=""
          data-testid="email-input"
          placeholder="Coloque seu e-mail"
        />
        <input
          type="password"
          name=""
          id=""
          data-testid="password-input"
          placeholder="Senha"
        />
        <button type="submit" data-testid="login-submit-btn">
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
