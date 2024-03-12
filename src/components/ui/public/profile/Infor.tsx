"use client"
import { Box, Button, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';

export default function Infor() {
    const [gender, setGender] = React.useState('');
    const [name,setName] = React.useState('');
    const [message,setMessage] = React.useState("");
    const route = useRouter()
    const [user, setUser] = React.useState<any>();
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
      };

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

    const getInfoUser = React.useCallback(async () => {
        try {
          const token = getCookieValue('AuthToken');
          const res = await axios.get(`http://localhost:8080/api/v1/users/info`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          console.log("users: ", res.data);
          setUser(res.data);
    
          setGender(res.data.gender?'1':'0');
          setName(res.data.name);
    
          return res.data;
        } catch (error) {
          console.error("error", error);
        }
      }, []);

      React.useEffect(() => {
        getInfoUser();
      }, [getInfoUser]);

    const handleResetInput = () => {
        setGender(user.gender?'1':'0');
        setName(user.name);
    }

    const checkingInp = () => {
        const checkedGender = gender === "1";
    
        if (user?.name === name.trim() && user?.gender === checkedGender) {
          return true;
        }
    
        return false;
    };
    
    const putUser = async() =>{
        try{
          const token = getCookieValue('AuthToken');
          if (!token){
            return false;
          }
          const res = await axios.put(`http://localhost:8080/api/v1/users`,{
                fullName: name,
                gender: gender== '1'? true : false
            },
            {
                headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                }
            }
          )
    
          console.log("cart: ", res)
    
          if(res.status != 201){
            setMessage("Vui lòng nhập lại!")
            return false;
          }

          return true;
        }catch(error){
          console.error("error",error)
          setMessage("Vui lòng nhập lại!")
        }  
      }
    
    const handleClickUpdateInfo = async () => {
        const checkPost = await putUser();
        if(checkPost){
            Swal.fire("Thành Công!", "Đã Cập Nhập", "success").then(() => {
            });
        return;
        }
        Swal.fire("Thất Bại!", "" + message , "error");
    }
    
  return (
    <Paper elevation={3}>
        <Box sx={{padding: 3, }}>
            <Typography variant='h5' fontWeight={700} align='center'>Tài Khoản Của Tôi</Typography>
            <Typography variant='subtitle2' fontStyle={"italic"}>Quản lý thông tin hồ sơ để bảo mật tài khoản</Typography>
            <Box height={10}/>
            <Divider />
            <Box  sx={{padding: 3, }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Họ Và Tên</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Giới Tính</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Nam</MenuItem>
                                <MenuItem value={0}>Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}  >
                        <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-around"} height={50} paddingLeft={15} paddingRight={15}>
                            <Button size="medium" variant='outlined' sx={{
                                    width: "20%",
                                    borderColor: "#FC9C55",
                                    '&:hover': {
                                    backgroundColor: "#FC9C55",
                                    borderColor: "#FC9C55",
                                    }
                                }}
                                disabled={checkingInp()}
                                onClick={handleResetInput}
                            >
                                <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700, color: "#FC9C55",
                                    '&:hover': {
                                    color: "white"
                                    }}}
                                    
                                    >
                                    Huỷ Bỏ
                                </Typography>
                            </Button>
                            <Button size="medium" variant='contained' style={{width: "20%", backgroundColor: "#FC9C55" }} onClick={handleClickUpdateInfo} disabled={checkingInp()}>
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
