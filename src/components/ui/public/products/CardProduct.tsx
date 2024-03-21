"use client"
import React from 'react'
import Image from 'next/image'
import cat from '@/app/favicon.ico'
import { Alert, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { Close } from '@mui/icons-material'

export default function CardProduct({data} : any) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true);

  const handleClickAgree = () => {
    router.push('/login');
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
    
  const handleCardClick = (id: number) =>{
    router.push(`/products/${id}`);
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [success]);
  
  return (
    <Card >
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
      <CardActionArea onClick={()=> handleCardClick(data.id)}>
        <CardMedia
          src={data.img}
          component="img"
          height={12}
          style={{ height: '16rem', padding: 10 }}
          alt="hình cún con"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div"  
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 2,
              maxHeight: '3em', 
              lineHeight: '1.5em',
            }}>
            {data.name}
          </Typography>
          <Box sx={{display: "flex", flexDirection: "row", justifyContent: 'flex-end'}}>
            <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}}  >
                {150.000.toLocaleString('en-US', {
                        style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        })} VND
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through',opacity: 0.6, }}>
                {data.price.toLocaleString('en-US', {
                        style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        })} VND
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" variant='outlined' sx={{
            borderColor: "#FC9C55",
            '&:hover': {
              backgroundColor: "#FC9C55",
              borderColor: "#FC9C55",
            }
          }}
          onClick={()=>handleClickAddProduct(data.id)}
          >
          <Typography variant='body2' sx={{fontSize: 12, color: "#FC9C55",
            '&:hover': {
              color: "white"
            }}}
          
            >
            Thêm Vào Giỏ Hàng
          </Typography>
        </Button>
        <Button size="medium" variant='contained' style={{ backgroundColor: "#FC9C55" }} onClick={()=>handleClickBuy(data.id)}>
          <Typography variant='body2' sx={{fontSize: 12}}>
            Mua Ngay
          </Typography>
        </Button>
      </CardActions>
    </Card>
  )
}
