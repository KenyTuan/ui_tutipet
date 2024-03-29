"use client"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';

export default function FormChangePassword() {
    const [oldPws, setOldPws] = React.useState('');
    const [newPws,setNewPws] = React.useState('');
    const [confirmPws,setConfirmPws] = React.useState('');
    const [oldPwsError, setOldPwsError] = React.useState(false);
    const [newPwsError, setNewPwsError] = React.useState(false);
    const [confirmPwsError, setConfirmPwsError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [submitSuccess, setSuccessSubmit] = React.useState(false);
    const [success,setSuccess] = React.useState(false);
    const [formValid, setFormValid] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const handlePassword = () => {
        if (
          !oldPws ||
          oldPws.length < 5 ||
          oldPws.length > 20
        ) {
            setOldPwsError(true);
          return;
        }
    
        setOldPwsError(false);
    };

    const handleNewPws = () => {
        if (
            !newPws ||
            newPws.length < 5 ||
            newPws.length > 20
        ) {
            setNewPwsError(true);
            return;
        }

        setNewPwsError(false);
    };

    const handleConfirmPws = () => {
        if (
            !confirmPws ||
            confirmPws.length < 5 ||
            confirmPws.length > 20
        ) {
            setConfirmPwsError(true);
            return;
        }

        setConfirmPwsError(false);
    };

    const checkedInputSuccess = React.useCallback(() => {
        return (
            !newPwsError &&
            !oldPwsError &&
            !confirmPwsError
        );
    }, [confirmPwsError, newPwsError, oldPwsError]);

    function getCookieValue(cookieName: string) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }

    React.useEffect(() => {
        const checked = checkedInputSuccess();
        setSuccess(checked);
    }, [confirmPwsError, newPwsError, oldPwsError, checkedInputSuccess]);

    const updateChangePws = async () => {
        try {
            const token = getCookieValue('AuthToken');
            if (!token) {
                return false;
            }
    
            const res = await axios.put(
                `http://localhost:8080/api/v1/users/change_password`,
                {
                    oldPassword: oldPws,
                    newPassword: newPws,
                    confirmPassword: confirmPws
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (res.status !== 201) {

                return false;
            }
            console.log("res", res)
            return true;
        } catch (error: any) {
            console.error("error", error);
            const messenge = error.response.data.message;
            setFormValid(messenge.split(", ")[0]);
            return false;
        }
    };

    const handleSubmit= async () => {
        const checkPost = await updateChangePws();
        if(checkPost){
            Swal.fire("Thanh Công!", "Đã Xong", "success")
            .then(()=>(window.location.reload()))
            return;
        }
    }



  return (
    <Paper elevation={3}>
        <Box sx={{padding: 3, }}>
            <Typography variant='h5' fontWeight={700} align='center'>Đổi Mật Khẩu</Typography>
            <Box height={10}/>
            <Divider />
            <Box  sx={{padding: 3, }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Password Cũ</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {
                            setOldPws(event.target.value);
                        }}
                        error={oldPwsError}
                        onBlur={handlePassword}
                        value={oldPws}
                        id="password"
                        size="small"
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
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Password Mới</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {
                            setNewPws(event.target.value);
                        }}
                        error={newPwsError}
                        onBlur={handleNewPws}
                        value={newPws}
                        id="password-new"
                        size="small"
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
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Xác Nhận Password</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => {
                            setConfirmPws(event.target.value);
                        }}
                        error={confirmPwsError}
                        onBlur={handleConfirmPws}
                        value={confirmPws}
                        id="password-confirm"
                        size="small"
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
                    <Grid item xs={12}  >
                        {formValid && (
                            <Stack sx={{ width: "100%", paddingRight: "15%", paddingLeft: "34%" }} spacing={2} justifyContent={"center"} marginBottom={2}>
                                <Alert severity="error">
                                {formValid}
                                </Alert>
                            </Stack>
                            )}
                        <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-around"} height={50} paddingLeft={15} paddingRight={15}>
                            {/* <Button size="medium" variant='outlined' 
                                sx={{
                                    width: "20%",
                                    borderColor: "#FC9C55",
                                    '&:hover': {
                                    backgroundColor: "#FC9C55",
                                    borderColor: "#FC9C55",
                                    }
                                }}
                            >
                                <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700, color: "#FC9C55",
                                    '&:hover': {
                                    color: "white"
                                    }}}
                                    >
                                    Huỷ Bỏ
                                </Typography>
                            </Button> */}
                            <Button size="medium" variant='contained' disabled={!success} style={{width: "20%", backgroundColor: "#FC9C55" }} onClick={handleSubmit} >
                                <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700,}}>
                                    Cập Nhật
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Paper>
  )
}
