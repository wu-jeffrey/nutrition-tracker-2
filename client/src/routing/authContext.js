import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    this.state = {
      isAuth: !!token,
      token: token,
      user: user,
    }
  }

  login(token, user) {
    // TODO: Vulnerability to CSRF & XSS because this sensitive data is exposed
    // NOTE: Need to set localStore before state, because the latter triggers 
    // a component update which needs the tokens in the store
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);

    this.setState({ isAuth: true, token: token, user: user });
  }

  logout() {
    this.setState({ isAuth: false, token: undefined, user: undefined });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
