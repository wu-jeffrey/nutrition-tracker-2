import React from 'react';
import './login.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AuthConsumer } from '../../routing/authContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    rememberMe: false,
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(callback, event) {
    event.preventDefault();
    event.stopPropagation();
    
    // TODO: Add validation
    const { email, password } = this.state;
    const settings = {
      method: 'POST',
      mode: 'cors',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    };
    
    (async () => {
      const _response = await fetch(encodeURI("/api/auth"), settings);
      const response = await _response.json();

      if (_response.status !== 200) {
        console.log(response.msg);
      } else {
        callback(response.token, response.user);
        setTimeout(this.props.history.push('/'), 0);
      }
    })();
  }

  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login }) => (isAuth ? <Redirect to='/'/> : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
              <Avatar className="avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <form className="form" noValidate onSubmit={this.handleSubmit.bind(this, login)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  onChange={this.handleInputChange.bind(this)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>)
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(Login);