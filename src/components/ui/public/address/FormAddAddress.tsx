"use client"
import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
interface ListCartProps {
    open: boolean
    handleClose: () => void;
}

const isPhone = (phone: string) => /(03|05|07|08|09|01[2689])[0-9]{8}\b/.test(phone);

 const FormAddAddress:React.FC<ListCartProps>  =({ open , handleClose }) =>  {
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);
    const [selectProvinces, setSelectProvinces] = React.useState<any>(null);
    const [selectDistricts, setSelectDistricts] = React.useState<any>(null);
    const [selectwards, setSelectWards] = React.useState<any>(null);
    const [receiverName, setReceiverName] = React.useState("");
    const [phone,setPhone] = React.useState("");
    const [address,setAddress] = React.useState(""); 
    const [success,setSuccess] = React.useState(false);
    const [submitSuccess, setSuccessSubmit] = React.useState(false);
    const [receiverNameError, setReceiverNameError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);

    const handleReceiverName = () => {
        if (!receiverName) {
            setReceiverNameError(true);
            return;
        }
    
        setReceiverNameError(false);
      };

    const handlePhone = () => {
        if (!isPhone(phone)) {
            setPhoneError(true);
            return;
        }
        setPhoneError(false);
    };

    const checkedInputSuccess = React.useCallback(() => {
        return (
            selectProvinces !== null &&
            selectDistricts !== null &&
            selectwards !== null &&
            !receiverNameError &&
            !phoneError &&
            address.trim() !== ""
        );
    }, [selectProvinces, selectDistricts, selectwards, receiverNameError, phoneError, address]);

    React.useEffect(() => {
        const checked = checkedInputSuccess();
        setSuccess(checked);
    }, [selectProvinces, selectDistricts, selectwards, receiverName, phone, address, checkedInputSuccess]);
    

    const fetchProvinces = async () => {
    try {
        const response = await fetch('https://vapi.vnappmob.com/api/province/');
        const data = await response.json();
        console.log(data);

        const modifiedProvinces = data.results.map((province: { province_name: string; }) => {
        if (province.province_name.includes('Tỉnh ')) {
            province.province_name = province.province_name.replace('Tỉnh ', '');
        } else if ( province.province_name.includes('Thành phố ')) {
            province.province_name = province.province_name.replace('Thành phố ', 'TP. ');
        }
        return province;
        });

        const sortedProvinces = modifiedProvinces.slice().sort((a:any, b:any) => a.province_name.localeCompare(b.province_name));
        
          

        setProvinces(sortedProvinces);

    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
    };

    const fetchDistrict = async (id: any) => {
        try {
            const response = await fetch('https://vapi.vnappmob.com/api/province/district/' + id.province_id);
            const data = await response.json();
            setDistricts(data.results);
        } catch (error) {
        console.error('Error fetching provinces:', error);
    }
    };

    const fetchWard = async (id: any) => {
    try {
        const response = await fetch('https://vapi.vnappmob.com/api/province/ward/' + id.district_id);
        const data = await response.json();

        setWards(data.results);
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
    };


    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if(value !== selectProvinces){
            setSelectProvinces(value);
            setSelectDistricts(null);
            setSelectWards(null);
            fetchDistrict(value);
        }
        
    };

    const handleChangeDistricts = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if(value !== selectDistricts){
            setSelectDistricts(value);
            setSelectWards(null);
            fetchWard(value);
        }
        
    };

    const handleChangeWards = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectWards(value);
    };

    React.useEffect(() => {
        fetchProvinces();
      }, []);

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

    const postCart = async () => {
        try {
            const token = getCookieValue('AuthToken');
            if (!token || !success) {
                return false;
            }
    
            let addressSuccess = address.trim();
    
            if (selectwards && selectwards.wards_name) {
                addressSuccess += `, ${selectwards.wards_name.trim()}`;
            }
    
            if (selectDistricts && selectDistricts.district_name) {
                addressSuccess += `, ${selectDistricts.district_name.trim()}`;
            }
    
            if (selectProvinces && selectProvinces.province_name) {
                addressSuccess += `, ${selectProvinces.province_name.trim()}`;
            }
    
            const res = await axios.post(
                `http://localhost:8080/api/v1/address`,
                {
                    receiverName: receiverName,
                    address: addressSuccess,
                    phone: phone,
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
            
            return true;
        } catch (error) {
            console.error("error", error);
            return false;
        }
    };

    const resetForm = () => {
        setSelectProvinces(null);
        setSelectDistricts(null);
        setSelectWards(null);
        setReceiverName("");
        setPhone("");
        setAddress("");
        setSuccess(false);
        setSuccessSubmit(false);
    };

    const handleSubmit= async () => {
        const checkPost = await postCart();
        if(checkPost){
            setSuccessSubmit(true)
            resetForm();
            handleClose()
            return;
        }
    }

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSuccessSubmit(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [success]);

  return (
    <Box>
        <Collapse in={submitSuccess} style={{ position: 'fixed', zIndex: 11, bottom: 0, left: 10 }}>
            <Alert
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setSuccessSubmit(false);
                }}
                >
                    <Close fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
                Thông tin nhận hàng đã được thêm!
            </Alert>
        </Collapse>
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
                    <Grid item xs={6}>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            value={receiverName}
                            onChange={(event) => setReceiverName(event.target.value)}
                            label="Họ Và Tên"
                            fullWidth
                            onBlur={handleReceiverName}
                            error={receiverNameError}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            label="Số Điện Thoại"
                            fullWidth
                            onBlur={handlePhone}
                            error={phoneError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectProvinces}
                            onChange={handleChange}
                            MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 200, 
                                  },
                                },
                              }}
                        >
                            {provinces?.map((province: any) => (
                                <MenuItem value={province} key={province?.province_id}>{province?.province_name}</MenuItem>
                            )
                            )}
                            
                        </Select>
                        </FormControl>
                    </Grid>
                    {
                        selectProvinces !== null &&
                        (
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectDistricts}
                                    onChange={handleChangeDistricts}
                                    MenuProps={{
                                        PaperProps: {
                                        style: {
                                            maxHeight: 200, 
                                        },
                                        },
                                    }}
                                >
                                    {districts?.map((district: any) => (
                                        <MenuItem value={district} key={district?.district_id}>{district?.district_name}</MenuItem>
                                    )
                                    )}
                                    
                                </Select>
                                </FormControl>
                            </Grid>
                        )
                    }
                    {
                        selectProvinces !== null && selectDistricts !== null &&
                        (
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectwards}
                                    onChange={handleChangeWards}
                                    MenuProps={{
                                        PaperProps: {
                                        style: {
                                            maxHeight: 200, 
                                        },
                                        },
                                    }}
                                >
                                    {wards?.map((ward: any) => (
                                        <MenuItem value={ward} key={ward?.ward_id}>{ward?.ward_name}</MenuItem>
                                    )
                                    )}
                                </Select>
                                </FormControl>
                            </Grid>
                        )
                    }

                    <Grid item xs={12}>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            label="Địa chỉ cụ thể"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            fullWidth
                            disabled={!selectDistricts && !selectwards && !selectProvinces}
                        />
                    </Grid>
                </Grid>
                </Box>
                
            </DialogContent>
            <DialogActions>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-around"} width={"100%"}>
                    <Button onClick={handleClose} variant='outlined' style={{width: 100,}} className='border-orange-500 hover:border-orange-600' >
                        <Typography fontSize={18} fontWeight={600} className='text-orange-500 hover:text-orange-600' >
                            Hủy
                        </Typography>
                    </Button>
                    <Button onClick={handleSubmit} autoFocus disabled={!success} variant='contained' 
                        className='bg-orange-500 hover:bg-orange-600'>
                        <Typography fontSize={18} fontWeight={600} className='text-white' >
                            Đồng ý
                        </Typography>
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    </Box>
        
  )
}

export default FormAddAddress;