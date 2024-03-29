"use client"
import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import axios from 'axios';
import React from 'react'

interface ListCartProps {
    open: boolean
    handleClose: () => void;
    item: any
}

const isPhone = (phone: string) => /(03|05|07|08|09|01[2689])[0-9]{8}\b/.test(phone);

const FormEditAddress:React.FC<ListCartProps>  =({ open , handleClose, item }) =>  {
    const arrAdrress = item.address.split(', ')
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);
    const [selectProvinces, setSelectProvinces] = React.useState<any>(null);
    const [selectDistricts, setSelectDistricts] = React.useState<any>(null);
    const [selectwards, setSelectWards] = React.useState<any>(null);
    const [receiverName, setReceiverName] = React.useState( item.receiverName ||"");
    const [phone,setPhone] = React.useState(item.phone ||"");
    const [address,setAddress] = React.useState(arrAdrress[0]|| ""); 
    const [success,setSuccess] = React.useState(false);
    const [submitSuccess, setSuccessSubmit] = React.useState(false);
    const [selectedWards,setSelectedWards] = React.useState("");
    const [selectedDistricts,setSelectedDistricts] = React.useState( "");
    const [selectedProvinces, setSelectedProvinces] = React.useState("");

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

    console.log("selectProvinces",selectProvinces)
    console.log("selectDistricts",selectDistricts)
    console.log("selectwards",selectwards)
    console.log("success", success)

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
        
        
        return sortedProvinces

    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
    };

    const fetchDistrict = async (id: any) => {
        try {
            console.log("ssss",id)
            const response = await fetch('https://vapi.vnappmob.com/api/province/district/' + id.province_id);
            const data = await response.json();
            console.log("response",response)
            setDistricts(data.results);
            return data.results
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
            setSelectedProvinces(value);
            setSelectDistricts(null);
            setSelectWards(null);
            fetchDistrict(value);
        }
    };

    const handleChangeDistricts = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if(value !== selectDistricts){
            setSelectDistricts(value);
            setSelectedDistricts(value);
            setSelectWards(null);
            fetchWard(value);
        }
        
    };

    const handleChangeWards = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectWards(value);
        setSelectedWards(value);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const arrAdrress = item.address.split(', ')
                const res_provinces = await fetchProvinces();
                setProvinces(res_provinces);
                console.log("Provinces", res_provinces)
                console.log("arrAdrress[2]", arrAdrress[2])
                const provincesFilter = res_provinces.filter((item: any) => {
                    return item.province_name == arrAdrress[2];
                });
                setSelectProvinces(provincesFilter[0])
                const res_districts = await fetchDistrict(provincesFilter[0]);
                console.log("res_districts", districts)
                console.log("arrAdrress[1]", arrAdrress[1])
                const districtsFilter = res_districts.filter((item: any) => {
                    return item.district_name == arrAdrress[1];
                });

                setSelectDistricts(districtsFilter[0])

                const res_ward = await fetchDistrict(districtsFilter[0]);
                const wardFilter = res_ward.filter((item: any) => {
                    return item.district_name == arrAdrress[0];
                });
                setSelectDistricts(wardFilter[0])
                console.log("districtsFilter",districtsFilter)
                console.log("provincesFilter", provincesFilter);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
    
        fetchData();
      }, [selectedProvinces]);

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
    
            const res = await axios.put(
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
    
            console.log("cart: ", res);
    
            if (res.status !== 201) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("error", error);
            return false;
        }
    };

    const handleSubmit= async () => {
        const checkPost = await postCart();
        if(checkPost){
            setSuccessSubmit(true)
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
                Cập Nhật Thành Công!
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
                                            maxHeight: 200, // Giới hạn chiều cao hiển thị
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
                                    value={selectedWards}
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
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSubmit} autoFocus disabled={!success}>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}

export default FormEditAddress;
