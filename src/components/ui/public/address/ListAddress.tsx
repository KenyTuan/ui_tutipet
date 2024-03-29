"use client"
import React from 'react'
import { Box, Button, Divider, List, Paper, Stack, Typography } from '@mui/material'
import FormAddAddress from './FormAddAddress';
import axios from 'axios';
import CardAddress from './CardAddress';

export default function ListAddress() {
    const [open, setOpen] = React.useState(false);
    const [addresses, setAddresses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    const getListAddress = React.useCallback(async () => {
      try {
        const token = getCookieValue('AuthToken');
        if (!token) {
          setLoading(false);
          return false;
        }
        const res = await axios.get(`http://localhost:8080/api/v1/address/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setAddresses(res.data._embedded.addressResList);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
        setError("Error fetching addresses. Please try again.");
        setLoading(false);
      }
    }, []);

    const deleteProductCart = async(id: number) =>{
        try{
            const token = getCookieValue('AuthToken');
            if (!token){
                return;
            }
            const res = await axios.delete(`http://localhost:8080/api/v1/address/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            console.log("carts: ", res)
            return res
        }catch(error){
            console.error("error",error)
            setError("Error deleting address. Please try again.");

        }
    }

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
        getListAddress();
        
      }, [getListAddress]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      getListAddress()
    };

    const handleClickDelete = async (id: number) => {
      const checkPost = await deleteProductCart(id);
      if (checkPost) {
        setAddresses(addresses.filter(item => item.id !== id));
      }
    };
  return (
    <Paper elevation={3}>
        <Box sx={{padding: 3, marginBottom: 5}}>
            <FormAddAddress open={open} handleClose={handleClose}   />
            <Stack display={'flex'} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant='h5' fontWeight={700} align='center'>Địa Chỉ Của Tôi</Typography>
                <Button size="medium" variant='contained' style={{fontWeight: 600, backgroundColor: "#FC9C55" }}>
                    <Typography variant='body2' onClick={handleClickOpen}>
                        Thêm địa chỉ mới
                    </Typography>
                </Button>
            </Stack>
            <Box height={10}/>
            <Divider />
            <Box  sx={{padding: 3,}}>
                <Box paddingTop={2} paddingBottom={2}>
                    <Typography variant='h6' fontWeight={600}>
                      Địa chỉ
                    </Typography>
                </Box>
                <List
                    sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    minHeight: 400,
                    maxHeight: 400,
                    '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {addresses.length > 0 ? (
                        addresses.map((address: any) => (
                            <CardAddress key={address.id}  item={address} onDelete={handleClickDelete} />
                        ))
                    ) : (
                      <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="subtitle1" fontStyle={"italic"}>No addresses found.</Typography>
                      </Stack>
                    )}
                </List>
            </Box>
        </Box>
    </Paper>
  )
}
