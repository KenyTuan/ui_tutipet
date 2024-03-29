"use client"
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { Email } from '@mui/icons-material';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function SignUp() {

    const router = useRouter();

    const handleNavigateToHome = () => {
        router.push('/');
    };

    const postRegister = async(data: any) =>{
      axios.post('http://localhost:8080/api/v1/auth/register',
        {
          fullName: data.get('fullName'),
          email: data.get('email'),
          password: data.get('password'),
          confirmPassword: data.get('confirmPassword'),
          gender : data.get('gender') == 0 ? false : true
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          document.cookie = `AuthToken=${response.data.token}; path=/; max-age=3600; Secure; SameSite=Strict`;
          router.push('/');
        })
        .catch(error => {
          if (error.response) {
            const messenge = error.response.data.message;
            setFormValid(messenge.split(", ")[0]);
            console.error('Server Error:', error.response.status);
            console.error('Error Data:', error.response.data);
          } else if (error.request) {
            console.error('No response received');
          } else {
            console.error('Error setting up the request:', error.message);
          }
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);

        console.log("sucess",postRegister(dataForm));


    };

    const [showPassword, setShowPassword] = useState(false);

    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPwdInput, setConfirmPwdInput] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPwdError, setConfirmPwdError] = useState(false);

    const [formValid, setFormValid] = useState('');
    const [success, setSuccess] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleConfirmPwd = () => {
    if (!confirmPwdInput ) {
      setConfirmPwdError(true);
      return;
    }

    setConfirmPwdError(false);
  };


  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, width: 100, height: 100 }} src="/logo.svg" alt='Logo Shop'/>
          <Typography component="h1" variant="h4" className='font-semibold'>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        error={usernameError}
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="fullName"
                        onChange={(event) => {
                          setUsernameInput(event.target.value);
                        }}
                        onBlur={handleUsername}
                        value={usernameInput}
                    />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label" className='font-semibold' >Gender:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={0}
                        name="gender"
                        className='ml-20'
                        row
                    >
                        <Grid container spacing={8}>
                            <Grid item xs={6}>
                                <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel value={1} control={<Radio />} label="Nam" />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    error={emailError}
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onBlur={handleEmail}
                    onChange={(event) => {
                      setEmailInput(event.target.value);
                    }}
                    value={emailInput}
                    />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setPasswordInput(event.target.value);
                  }}
                  error={passwordError}
                  onBlur={handlePassword}
                  value={passwordInput}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                  }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setConfirmPwdInput(event.target.value);
                  }}
                  error={confirmPwdError}
                  onBlur={handleConfirmPwd}
                  value={confirmPwdInput}
                  id="confirmPwd"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                  }
                  }
                />
              </Grid>
            </Grid>

            {formValid && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error">
                  {formValid}
                </Alert>
              </Stack>
            )}

            {success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success">
                  {success}
                </Alert>
              </Stack>
            )}
      
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleNavigateToHome}
                >
                    Quay Lại
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className='bg-blue-500'
                >
                    Đăng Ký
                </Button>
              </Grid>
            </Grid>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}