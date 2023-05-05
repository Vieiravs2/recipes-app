import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = localStorage.setItem('user', JSON.stringify({ email }));
    return user;
  }, [email]);

  const values = useMemo(() => ({
    email, setEmail, password, setPassword,
  }), [email, setEmail, password, setPassword]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
