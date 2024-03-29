"use client"
import { Close } from '@mui/icons-material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {  DateTimePicker, LocalizationProvider, } from '@mui/x-date-pickers'
import React from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText,  MenuItem, Modal, Select } from '@mui/material'
import FormSelectProduct from './FormSelectProduct'
import axios from 'axios'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function EditForm({ eventClose, promotion} : any) {
    const [formValid, setFormValid] = React.useState('');
    const [data, setData] = React.useState<any[]>(promotion.productRes ||[]);
    const [openSelection, setOpenSelection] = React.useState(false);
    const handleOpenSelection = () => setOpenSelection(true);
    const handleCloseSelection = () => setOpenSelection(false);
    const [discountType, setDiscountType] = React.useState(promotion.discountType);
    const [discount, setDiscount] = React.useState(promotion.discountType === "PERCENTAGE" ? promotion.value * 100 : promotion.value || 0);
    const [fromDate, setFromDate] = React.useState(dayjs(promotion.fromTime)); 
    const [toDate, setToDate] = React.useState(dayjs(promotion.toTime));

    const handleFromDateChange = (newDate: any) => {
        const fromDateDayjs = dayjs(newDate);
        setFromDate(fromDateDayjs);
        if (fromDateDayjs.isAfter(toDate)) {
            setToDate(fromDateDayjs);
        }
    }
    
    const handleToDateChange = (newDate: any) => {
        const toDateDayjs = dayjs(newDate);
        setToDate(toDateDayjs);
    }
    const handleChangeDiscountType = (event: any) => {
        setDiscountType(event.target.value);
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


    const postPromotion = async(dataForm: any) =>{
        try{
            const token = getCookieValue('AuthToken');
            if(!token){
                return;
            }

            const formattedFromTime = dayjs(dataForm.get('formTime')).toISOString();
            const formattedToTime = dayjs(dataForm.get('toTime')).toISOString();
            const arrayOfIds = data.map(item => item.id);
            const res = await axios.put(`http://localhost:8080/api/v1/promotion`,
            {
                fromTime: formattedFromTime,
                toTime: formattedToTime,
                discountType: dataForm.get('discountType'),
                value: dataForm.get('value'),
                productIds: arrayOfIds,
            },
            {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            }
            )

            console.log("product: ", res)

            if(res.status !== 201){
                setFormValid(res.request.response)
                return false;
            }
            return true;
        }catch(error){
            console.error("error",error)
            return false;
        }

    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        let isValid = true;
        for (const [key, value] of dataForm.entries()) {
            if (value === '') {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            setFormValid('Vui Lòng Chưa Nhập Đủ Thông Tin!')
            return;
        }

        if (data.length === 0) {
            console.log("token", data);
            setFormValid('Bạn Chọn Danh Sách Sản Phẩm Giảm Giá Chưa?')
            return;
          }

        const checkPost = await postPromotion(dataForm);

        if(checkPost){
            eventClose();
            Swal.fire("Thanh Công!", "Đã Xong", "success")
            .then(()=>(window.location.reload()))
            return;
        }
    
    };

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        if(discountType === "PERCENTAGE" && value > 100){
            setDiscount(100)
            return;
        }
        setDiscount(value)
      };





  return (
    <>
        <Modal
            open={openSelection}
            onClose={handleCloseSelection}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <FormSelectProduct eventClose={handleCloseSelection} setData={setData}/>
        </Box>
        </Modal>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box>
                <Typography variant='h5' align='center'>
                    Cập Nhập Chương Trình Ưu Đãi
                </Typography>
                <IconButton 
                    style={{ position: "absolute", top: "0", right: "0"}}
                    onClick={eventClose}
                >
                    <Close />    
                </IconButton>           
            </Box>
            <Box height={10}  />
            <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={12}>
                    <Stack direction={'row'} spacing={2} justifyContent={"space-between"}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="Từ Ngày" name='formTime' value={fromDate} 
                                onChange={handleFromDateChange} />    
                        </LocalizationProvider>
                        <Typography variant='h4' component={'div'}>
                            -
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="Đến Ngày" name='toTime' value={toDate} 
                                minDateTime={fromDate}
                                onChange={handleToDateChange}/>    
                        </LocalizationProvider>
                    </Stack>
                    
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Giảm Theo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="discountType"
                            name='discountType'
                            value={discountType}
                            onChange={handleChangeDiscountType}
                        >
                            <MenuItem value={"PERCENTAGE"}>% Giá Sản Phẩm</MenuItem>
                            <MenuItem value={"SPECIFIC"}>Giá Sản Phẩm</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id="standard-basic" 
                        label={discountType === "PERCENTAGE" ? "% Giảm giá" : "Giá trị giảm giá"} 
                        variant="standard" 
                        name='value' 
                        type="number" 
                        value={discount}
                        InputProps={{
                            inputProps: {
                            min: 0,
                            },
                            endAdornment: discountType === "PERCENTAGE" ? "%" : "VND",
                        }} 
                        fullWidth
                        onChange={handleInputChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 200,
                        }}
                        >
                        {data.map((item: any) => (
                            <ListItem key={`item-${item.id}`}>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.img} />
                                </ListItemAvatar>
                                <ListItemText primary={`${item.name}`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h3' align='center'>
                        <Button variant='outlined' type='button'  fullWidth onClick={handleOpenSelection}>
                            Chọn Sản Phẩm
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {formValid && (
                    <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                        <Alert severity="error">
                            {formValid}
                        </Alert>
                    </Stack>
                    )}
                    <Typography variant='h3' align='center'>
                        <Button variant='contained' type='submit' className='bg-blue-500' fullWidth >
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </>
  )
}
