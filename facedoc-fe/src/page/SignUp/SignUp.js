import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: '',
    fname: '',
    mname: '',
    lname: '',
    phone: '',
    role: '',
    tc: '',
    password: '',
    password2: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`register/`, {
        email: formData.email,
        fname: formData.firstName,
        mname: formData.middleName,
        lname: formData.lastName,
        phone: formData.PhoneNumber,
        // role fetch is remaining
        role: 'user',
        tc: true,
        password: formData.password,
        password2: formData.ConfirmPassword,
      })
      .then((res) => {
        history.push('/signin');
        console.log(res);
        console.log(res.data);
      });
  };

  const [value, setValue] = React.useState(0);
  const [roles, setRoles] = React.useState([
    'Common User',
    'License Officer',
    'Traffic Police',
    'Passport',
  ]);

  React.useEffect(() => {
    fetch('http://localhost:8000/user/roles')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data[0]);
        setRoles(data[0]);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}></Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='middleName'
                  label='Middle Name'
                  name='middleName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  variant='outlined'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label=''
                  onChange={(event) => {
                    setRoles(event.target.value);
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='number'
                  label='Phone Number'
                  name='PhoneNumber'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='ConfirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  Already have an account? Sign in.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
