import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [responseAPI, setResponseAPI] = useState([]);

  const values = useMemo(() => ({
    responseAPI, setResponseAPI,
  }), [responseAPI, setResponseAPI]);

  return (
    <FetchContext.Provider value={ values }>
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
