"use client"
import React from 'react'
import { Alert, Box, Button, Card, CardActionArea, CardMedia, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Paper, Stack, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Close } from '@mui/icons-material';

export default function ProductDetail(id: any) {
    const router = useRouter();
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true);
    const [product, setProduct] = React.useState<any>();

    const handleClickAgree = () => {
        router.push('/login');
      };

      const getListProduct = async() =>{
        try{
          const res = await axios.get(`http://localhost:8080/api/v1/products/${id.id}`)
  
          console.log("product: ", res)
          return res.data
        }catch(error){
          console.error("error",error)
        }
      }


    React.useEffect(() => {

        const fetchData = async () => {
            const result = await getListProduct();
            console.log("result", result)
            if(result){
    
              setProduct(result);
            }
            
          };
          fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
          setSuccess(false);
        }, 3000);
    
        // Clear the timeout when the component unmounts or when success changes
        return () => clearTimeout(timeoutId);
      }, [success]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
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

    const postCart = async(id: any) =>{
        try{
          const token = getCookieValue('AuthToken');
          if (!token){
            return false;
          }
          const res = await axios.post(`http://localhost:8080/api/v1/cart`,{
            productCartReqs: {
              productId: id,
            }
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
            return false;
          }
          return true;
        }catch(error){
          console.error("error",error)
        }
      }

    const handleClickAddProduct= async (id: string) => {
      const checkPost = await postCart(id);
      if(checkPost){
        setSuccess(true)
        return;
      }
      handleOpen()
    }
    const handleClickBuy= async (id: string) => {
        const checkPost = await postCart(id);
        if(checkPost){
            router.push("/shopping_cart")
            return;
        }
        handleOpen()
    }

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Bạn Đã Đăng Nhập Chưa?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Vui lòng đăng nhập để trải nghiệm tốt dịch vụ của chúng tôi!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} width={"100%"}>
                    <Button variant='contained' onClick={handleClose} className='bg-gray-400 hover:bg-gray-600' fullWidth sx={{fontSize: 16, fontWeight: "600", margin: 2}}>Đóng</Button>
                    <Button variant='contained' onClick={handleClickAgree} autoFocus className='bg-red-600 hover:bg-red-400' fullWidth sx={{fontSize: 16, fontWeight: "600",margin: 2}}>
                      Đồng ý
                    </Button>
                  </Stack>
                </DialogActions>
            </Dialog>
            <Collapse in={success} style={{ position: 'fixed', zIndex: 11, bottom: 0, left: 10 }}>
                <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setSuccess(false);
                        }}
                    >
                    <Close fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                Sản thẩm đã thêm vào giỏ hàng!
                </Alert>
            </Collapse>
            <Paper sx={{padding: 3, marginBottom: 1,}} elevation={3}>
                <Grid container spacing={3} sx={{padding: 2}}>
                    <Grid item xs ={5}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height={20}
                                    width={8}
                                    style={{ height: '20rem', objectFit:"contain" }}
                                    src={product?.img}
                                    alt="hình Cún Con"
                                    
                                    />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <Stack spacing ={2} direction="column" justifyContent={"space-between"} height={"100%"} padding={2}>
                            <Typography variant='h4' gutterBottom>{product?.name}</Typography>
                            <Divider />
                            <Box height={10}/>
                            <Stack direction="row" spacing ={1} justifyContent={"flex-end"}>
                            {
                              !!product?.promotion?
                              (
                              <Box sx={{display: "flex", flexDirection: "row", justifyContent: 'flex-end'}}>
                                  <Typography variant="h4" color="text.secondary" sx={{fontWeight: 700,}} marginRight={1} >
                                    {(product?.promotion.discountType === "PERCENTAGE"?(product.price-product.price * product?.promotion.value):(product.price - product?.promotion.value)).toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3,
                                  })}
                                  </Typography>
                                  <Typography variant="h6" color="text.secondary" sx={{textDecoration: 'line-through',opacity: 0.6, }}>
                                    {product?.price.toLocaleString('en-US', {
                                    style: 'decimal',
                                      minimumFractionDigits: 3,
                                      maximumFractionDigits: 3,
                                    })} VND
                                </Typography>
                              </Box>
                              ):(
                                <Box sx={{display: "flex", flexDirection: "row", justifyContent: 'flex-end'}}>
                                <Typography variant="h4" color="text.secondary" sx={{fontWeight: 700,}}  >
                                    {product?.price.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3,
                                  })}
                                </Typography>
                            </Box>
                              )}
                            </Stack>
                            
                            <Stack direction="row" spacing ={1} justifyContent={"space-evenly"}>
                                <Button size="medium" variant='outlined' sx={{
                                    borderColor: "#FC9C55",
                                    '&:hover': {
                                    backgroundColor: "#FC9C55",
                                    borderColor: "#FC9C55",
                                    }
                                }}
                                    onClick={()=>handleClickAddProduct(product.id)}
                                >
                                    <Typography variant='h6' sx={{fontWeight: 600,color: "#FC9C55",
                                        '&:hover': {
                                        color: "white"
                                        }}}>
                                        Thêm Vào Giỏ Hàng
                                    </Typography>
                                </Button>

                    
                                <Button size="medium" variant='contained' style={{fontWeight: 600, backgroundColor: "#FC9C55" }}
                                    onClick={()=>handleClickBuy(product.id)}
                                >
                                    <Typography variant='h6'>
                                        Mua Ngay
                                    </Typography>
                                </Button>
                            </Stack >
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

        <Box>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Mô Tả Sản Phẩm" value="1" />
                    <Tab label="Thông Tin Sản Phẩm" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">{product?.description}</TabPanel>
                <TabPanel value="2">{product?.info}</TabPanel>
            </TabContext>
        </Box>
    </Box>

  )
}
