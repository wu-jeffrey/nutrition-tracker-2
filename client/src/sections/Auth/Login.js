import { useState, useEffect, useRef } from 'react';
import './Login.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Lock } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../foundation/auth/authContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, login } = useAuthContext();

  useEffect(() => {
    if (isAuth) {
      setTimeout(() => { navigate('/', { replace: true }) });
    }
  }, [isAuth])


  function handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const inputType = target.name;

    switch (inputType) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'rememberme':
        setRememberMe(value)
        break;
      default:
        console.error('invalid input type on login form')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // TODO: Add validation
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
        login(response.token, response.user);
      }
    })();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <Lock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className="form" noValidate onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" name="rememberme" color="primary" />}
            label="Remember me"
            onChange={handleInputChange}
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
    </Container>
  );
}
