'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Link, OutlinedInput } from '@mui/material';
import { useRouter } from 'next/navigation';


const defaultTheme = createTheme();



export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [formValid, setFormValid] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.back();
  };

  // Validation for onBlur Email
  const handleEmail = () => {

    if (!emailInput) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (
      !passwordInput
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"}>
              <Link href={'/'}><Avatar sx={{ m: 2, width: 150, height: 150 }} src="/logo.svg" alt='Logo Shop'/></Link>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h3" fontWeight={600} color={"#555"}>
                  Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    label="Email Address"
                    fullWidth
                    error={emailError}
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%"}}
                    value={emailInput}
                    size="medium"
                    onBlur={handleEmail}
                    onChange={(event) => {
                      setEmailInput(event.target.value);
                    }}
                    margin='normal'
                  />
                  <FormControl sx={{ width: "100%" }} variant="outlined" margin='normal'>
                    <InputLabel
                      error={passwordError}
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={passwordError}
                      onBlur={handlePassword}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(event) => {
                        setPasswordInput(event.target.value);
                      }}
                      value={passwordInput}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Grid container direction={'row'} justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item xs={5}>
                      <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2}}
                        color='primary'
                        onClick={handleNavigateToHome}
                      >
                        <Typography fontSize={18} fontWeight={500}>
                          Quay Lại
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={5}>
                      <Button
                        className='bg-blue-500'
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                        color='primary'
                      >
                        <Typography fontSize={18} fontWeight={500}>
                          Đăng Nhập
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>                  
                  
                  <Grid item xs={12}>
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
                  </Grid>
                
                </Box>
              </Box>
            </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}