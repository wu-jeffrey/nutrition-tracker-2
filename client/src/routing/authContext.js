import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    const settings = {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    (async () => {
      const response = await fetch(encodeURI("/api/auth/user"), settings);
      const user = await response.json();

      if (response.status !== 200) {
        this.setState({
          loading: false,
          isAuth: false,
        })
      } else {
        debugger
        this.setState({
          loading: false, 
          isAuth: true,
          token: token,
          user: user,
        })
      }
    })();
  }

  login(token, user) {
    // TODO: Vulnerability to CSRF & XSS because this sensitive data is exposed
    // NOTE: Need to set localStore before state, because the latter triggers 
    // a component update which needs the tokens in the store
    localStorage.setItem('token', token);
    this.setState({ isAuth: true, token: token, user: user });
  }

  logout() {
    this.setState({ isAuth: false, token: undefined, user: undefined });
    localStorage.removeItem('token');
  }

  render() {
    return this.state.loading ? (null) : (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          user: this.state.user,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
