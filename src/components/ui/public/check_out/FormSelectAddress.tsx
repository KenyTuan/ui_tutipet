"use client"
import React from 'react'
import { Alert, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import CardItemAddress from './CardItemAddress';
import FormAddAddress from '../address/FormAddAddress';
import axios from 'axios';

interface ListCartProps {
    open: boolean
    handleClose: () => void;
    handleSelected: (item: any) => void
}

const FormSelectAddress:React.FC<ListCartProps>  =({ open , handleClose, handleSelected}) =>  {
  const [openAdd, setOpen] = React.useState(false);
  const [addresses, setAddresses] = React.useState<any[]>([]);
  const handleClickAddOpen = () => {
      setOpen(true);
    };
  
  const handleAddClose = () => {
    setOpen(false);
    getListAddress()
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
    
  const getListAddress = React.useCallback(async () => {
    try {
      const token = getCookieValue('AuthToken');
      if (!token) {
        return false;
      }

      const res = await axios.get(`http://localhost:8080/api/v1/address/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

        console.log("address: ", res);
        setAddresses(res.data._embedded.addressResList);
      } catch (error) {
        console.error("error", error);
      }
  }, []);
    
    React.useEffect(() => {
        const fetchData = async () => {
        await getListAddress();
        };
        fetchData();
    }, [getListAddress]);


  return (
    <Box>
        <FormAddAddress open={openAdd} handleClose={handleAddClose} />
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Địa Chỉ Mới"}
            </DialogTitle>
            <Box height={10}/>
            <DialogContent>
                <Box width={500}>
                  <Grid container spacing={2}>
                      {addresses.length > 0 ? (
                        addresses.map((a: any) => (
                          <Grid item xs={12} key={a.id}>
                            <CardItemAddress item={a} handleSeleted={handleSelected} />
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" fontStyle={"italic"}  display={"flex"} justifyContent={"center"} alignItems={"center"}>Danh sách địa chỉ trống.</Typography>
                        </Grid>
                      )}
                  </Grid>
                </Box>
                
            </DialogContent>
            <DialogActions sx={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                <Button size="large" variant='contained' style={{ backgroundColor: "#FC9C55" }} onClick={handleClickAddOpen}>
                    <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700,}}>
                        Thêm Thông Tin
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default FormSelectAddress;