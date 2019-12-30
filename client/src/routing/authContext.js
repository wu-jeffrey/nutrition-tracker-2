import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { isAuth: false };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(token, user) {
    this.setState({ isAuth: true, token: token, user: user });
    
    // TODO: Vulnerability to CSRF & XSS because this sensitive data is exposed
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  logout() {
    this.setState({ isAuth: false });
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
