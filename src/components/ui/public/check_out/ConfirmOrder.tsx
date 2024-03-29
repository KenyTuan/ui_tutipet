"use client"
import { Box, Button, Container, Divider, Grid, List, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ItemProductOrder from './ItemProductOrder';
import { useSearchParams } from 'next/navigation'
import FormSelectAddress from './FormSelectAddress';
import Swal from 'sweetalert2';

interface ConfirmOrderProps {
  id: string;
}

interface Address {
  id: number;
  receiverName: string;
  phone: string;
  address: string;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = () =>{
  const [productCarts, setProductCarts] = React.useState<any[]>([]);
  const route = useRouter()
  const [totalPrice, setTotalPrice] = React.useState(0);
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Address | null>(null);
  const [message,setMessage] = React.useState("");

  const handleSelected = (item: any) => {
      setSelected(item)
      handleClose()
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



  const postOrder = async () => {
    try {
      const token = getCookieValue('AuthToken');
      if (!token ) {
        return false;
      }

      if(selected == null){
        setMessage("Vui Lòng Chọn Thông Tin Nhận Hàng!")
        return;
      }
      
      const res = await axios.post(`http://localhost:8080/api/v1/create_payment`, 
      {

        amount: totalPrice
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

        console.log("order: ", res);

        if(res.status != 200){
          return false;
        }
        
        return res.data;
      } catch (error) {
        console.error("error", error);
      }
    };

    const handleClickPayment= async () => {

        const promotion: any[] = [];
        productCarts.forEach((item: any) => {
            if (item.productRes.promotion) {
                console.log("item", item);
                promotion.push(item.productRes.promotion.id);
            }
        });

        const promotionCodes =  [...new Set(promotion)];

        console.log("promotionCodes",promotionCodes)
        const latestProductCarts = productCarts.map(({ id, productRes, quantity }) => ({
            productCartId: id,
            productId: productRes.id,
            quantity,
            
        }));
      
        const checkPost = await postOrder();

        if(checkPost){
          const order = {
            address_id: selected?.id,
            note: "",
            productOrderReqs: latestProductCarts,
            promotionCodes: promotionCodes
            
          }
        Swal.fire({
          title: "Vui lòng thanh toán qua VnPay?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Thanh Toán",
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.setItem('orderData', JSON.stringify(order));
            route.replace(checkPost.redirect_url)
          }
        });
        return;
      }
      Swal.fire("Lỗi!", "" + message , "error");
    }

    React.useEffect(() => {
      const urlEncodedData = searchParams.get('checkedItems');
      
      if (urlEncodedData) {
        try {
          const decodedData = atob(urlEncodedData);
  
          const jsonObject = JSON.parse(decodedData);
  
          console.log("Decoded Object:", jsonObject);
          setProductCarts(jsonObject.checkedItems);
        } catch (error) {
          console.error('Error decoding or parsing JSON:', error);
        }
      }
    }, [searchParams, setProductCarts]);


    const calculateTotalPrice = React.useCallback(() => {
      let total = 0;
      productCarts.forEach((item: any) => {
        const price = !!item?.productRes?.promotion? (
          item?.productRes?.promotion.discountType === "PERCENTAGE"?
          item?.productRes?.price - item?.productRes?.price * item?.productRes?.promotion.value : 
          item?.productRes?.price - item?.productRes?.promotion.value)
          :(
              item?.productRes?.price
          )
        total += item.quantity * price;
      });
      
      setTotalPrice(total);
    
      return total;
    }, [productCarts, setTotalPrice]);

    React.useEffect(() => {
      const updatedTotalPrice = calculateTotalPrice();
      setTotalPrice(updatedTotalPrice);
    }, [calculateTotalPrice]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("ll",(!selected))
  console.log("productcarts", productCarts)
  console.log("selected", selected)

  return (
    <Container  >
      <FormSelectAddress open={open} handleClose={handleClose}  handleSelected={handleSelected} />
      <Box>
        <Grid container>
          <Grid item xs={7}>
            <List sx={{
                width: '95%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}>
              {
                productCarts.map(item =>(
                    <ItemProductOrder key={item.id} item={item} />
                  )
                )
              }
            </List>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3}>
              <Box padding={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <Typography textAlign={"center"} fontSize={24} fontWeight={700} padding={2} color={"#FC9C55"}>Thông Tin Đặt Hàng</Typography>
                  </Grid>

                  <Grid item xs={12}>
                  {
                    (selected ) ? (
                      <Grid container>
                        <Grid item xs={12}>
                          <Stack display={"flex"} flexDirection={"row"}>
                            <Box>
                              <Typography fontSize={18} fontWeight={600} >
                                  Địa Chỉ Của Bạn
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={9}>
                          <Stack display={'flex'} paddingLeft={2}>
                            <Stack display={'flex'} flexDirection={"row"}>
                              <Typography fontSize={18} fontStyle={"italic"}>{selected?.receiverName} </Typography>
                              <Typography fontSize={18} fontStyle={"italic"} paddingLeft={2}>{selected?.phone} </Typography>
                            </Stack>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"start"}>
                              <RoomIcon style={{ color: '#FC9C55', marginRight: 4,  }} />
                              <Typography fontSize={16}>{selected?.address} </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={3}>
                          <Box>
                            <Button variant='text' onClick={handleClickOpen}>Thay Đổi</Button>
                          </Box>
                        </Grid>
                      </Grid>
                    ):(
                      <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} marginBottom={3} >
                        <Button size="large" variant='contained' style={{ backgroundColor: "#FC9C55" }} onClick={handleClickOpen}>
                            <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700,}}>
                                Chọn Thông Tin Nhận Hàng
                            </Typography>
                        </Button>
                      </Stack>
                    )
                  }
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Typography className='text-xl font-bold'>Tổng Thành Tiền:</Typography>
                        <Typography className='text-xl font-bold'>{totalPrice.toLocaleString('en-US', {
                        style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        })} VND</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"Center"}>
                    <Button size="large" variant='contained' style={{ backgroundColor: "#FC9C55" }} onClick={handleClickPayment} >
                        <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700,}}>
                            Thanh Toán
                        </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>

  )
}

export default ConfirmOrder;
