import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider({
  children
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _token = localStorage.getItem('token');

    const settings = {
      method: 'GET',
      headers: {
        'x-auth-token': _token,
      },
    };

    (async () => {
      const response = await fetch(encodeURI("/api/auth/user"), settings);
      const user = await response.json();

      if (response.status !== 200) {
        setLoading(false);
        setAuthenticated(false);
      } else {
        setLoading(false);
        setAuthenticated(true)
        setToken(_token)
        setUser(user)
      }
    })()
  })

  function login(_token, user) {
    // TODO: Vulnerability to CSRF & XSS because this sensitive data is exposed
    // NOTE: Need to set localStore before state, because the latter triggers
    // a component update which needs the tokens in the store
    localStorage.setItem('token', token);
    setAuthenticated(true);
    setToken(_token);
    setUser(user)
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUser(null)
    localStorage.removeItem('token');
  }

  function updateUser(updatedUser) {
    setUser(updatedUser)
  }

  return loading ? (null) : (
    <AuthContext.Provider
      value={{
        isAuth: authenticated,
        login: login,
        logout: logout,
        user: user,
        updateUser: updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer }
