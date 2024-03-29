"use client"
import { Close } from '@mui/icons-material'
import { Alert, Button, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'

export default function AddForm({eventClose}: any) {
    const [data, setData] = React.useState([]);
    const [pet, setPet] = React.useState('');
    const [type, setType] = React.useState('');
    const [formValid, setFormValid] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const [isFilePicked, setIsFilePicked] = React.useState(false);

    const changeHandler = (event: any) => {
        const file = event.target.files[0];
        const fileSizeLimit = 32 * 1024 * 1024; 
    
        if (file.size > fileSizeLimit) {
            console.error('Kích thước file vượt quá giới hạn (32MB)');
            return;
        }
    
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result;
            setSelectedFile(base64String);
            console.log('Base64 encoded image:', base64String);
        };
        reader.readAsDataURL(file);
        console.log('file:', file);

        setIsFilePicked(true);
    };
    
    const getAllProductType = async() => {
        try{
          const res = await axios.get(`http://localhost:8080/api/v1/types`)
    
          console.log("type: ", res)
          
          return res.data
        }catch(error){
          console.error("error",error)
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
    
    const postProduct = async(dataForm: any,url: any) =>{
        try{
            const token = getCookieValue('AuthToken');
            if(!token){
                return;
            }
            const res = await axios.post(`http://localhost:8080/api/v1/products`,
            {
                name: dataForm.get('name'),
                price: dataForm.get('price'),
                type_id: dataForm.get('type'),
                info: dataForm.get('detail'),
                description: dataForm.get('description'),
                img: url
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

    const postImage = async() =>{
        try{
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=58240beb2987602ef6ecc2cdb3488c29`,
            {
                image: selectedFile.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")
            },
            {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
            }
            )

            console.log("image: ", res)

            if(res.status !== 200){
                return false;
            }
            return res.data.data.url;
        }catch(error){
            console.error("error",error)
            return false;
        }

    }
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        
        if(!isFilePicked){
            return;
        }

        const url = await postImage();

        if(!url){
            return;
        }

        const checkPost = await postProduct(dataForm,url);

        if(checkPost){
            eventClose();
            Swal.fire("Thanh Công!", "Đã Xong", "success")
            .then(()=>(window.location.reload()))
            return;
        }
 
    };
    
    
    React.useEffect(() => {
        const fetchData = async () => {
            try {
              const result = await getAllProductType();
              
              setData(result._embedded.productTypeResList);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        fetchData();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setPet(event.target.value);
    };

    const handleChangeType = (event: SelectChangeEvent) => {
        if(!pet){
            return;
        }
        setType(event.target.value);
    };

  return (
    <>  
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box>
                <Typography variant='h5' align='center' fontWeight={"600"}>
                    Thêm Sản Phẩm
                </Typography>
                <IconButton 
                    style={{ position: "absolute", top: "0", right: "0"}}
                    onClick={eventClose}
                >
                    <Close />    
                </IconButton>           
            </Box>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="standard-basic" label="Tên" variant="standard" name='name' fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pet</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pet}
                        label="Pet"
                        onChange={handleChange}
                    >
                        <MenuItem value={"CAT"}>Mèo</MenuItem>
                        <MenuItem value={"DOG"}>Chó</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Loại </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        name='type'
                        onChange={handleChangeType}
                        MenuProps={{ 
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            classes: {
                                paper: "scroll-menu", 
                            },
                            PaperProps: {
                                style: {
                                    maxHeight: 300, 
                                },
                            },
                        }}
                    >   
                        {
                            Array.isArray(data) && data.map((item : any) =>
                                (
                                    item.petType == pet &&
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                )    
                            )
                        }
                        
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    id="standard-basic" 
                    label="Giá" 
                    variant="standard" 
                    name='price' 
                    type="number" 
                    InputLabelProps={{
                        shrink: true,
                        
                      }} 
                    fullWidth/>
            </Grid>
            <Grid item xs={12} >
                <TextField 
                    id="standard-basic" 
                    label="Mô Tả" 
                    name='description' 
                    multiline
                    variant="filled"
                    rows={4}
                    fullWidth/>
            </Grid>
            <Grid item xs={12} >
                <TextField 
                    id="standard-basic" 
                    label="Chi tiết" 
                    name='detail' 
                    multiline
                    variant="filled"
                    rows={4}
                    fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    id="standard-basic" 
                    variant="standard" 
                    name='img' 
                    type="file"
                    onChange={changeHandler}
                    InputLabelProps={{
                        shrink: true,
                      }} 
                    fullWidth/>
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
