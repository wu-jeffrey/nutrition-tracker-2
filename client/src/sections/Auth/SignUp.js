import React from 'react';
import './SignUp.css';
import Avatar from '@mui/core/Avatar';
import Button from '@mui/core/Button';
import CssBaseline from '@mui/core/CssBaseline';
import TextField from '@mui/core/TextField';
import Link from '@mui/core/Link';
import Grid from '@mui/core/Grid';
import LockOutlinedIcon from '@mui/icons/LockOutlined';
import Typography from '@mui/core/Typography';
import Container from '@mui/core/Container';
import { AuthConsumer } from '../foundation/auth/authContext';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    const { firstName, lastName, email, password } = this.state;
    const settings = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: firstName + " " + lastName,
        email: email,
        password: password,
      })
    };

    (async () => {
      const _response = await fetch(encodeURI("/api/users/"), settings);
      const response = await _response.json();

      if (response.msg) {
        console.log(response.msg);
      } else {
        callback(response.token, response.user);
        this.props.history.push('/');
      }
    })();
  }

  render() {
    return (
      <AuthConsumer>
        {({ login }) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
              <Avatar className="avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className="form" noValidate onSubmit={this.handleSubmit.bind(this, login)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Grid>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(SignUp);
