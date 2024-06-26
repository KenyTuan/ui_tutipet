"use client"
import { Box, Divider, Grid, List, ListItem, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'next/navigation';

export default function DetailOrder(item: any) {
    const searchParams = useSearchParams()
    const [order, setOrder] = React.useState<any>();
    const [totalQuantity,setTotalQuantity] = React.useState(0);
    const [total,setTotal] = React.useState(0);

    React.useEffect(() => {
        const urlEncodedData = searchParams.get('order');
        if (urlEncodedData) {
            try {
    
                const decodedData = decodeURIComponent(atob(urlEncodedData)); 
    
                const jsonObject = JSON.parse(decodedData);
    
                let totalPrice = 0;
                let totalQuantity = 0;
    
                if (jsonObject.productOrderRes && Array.isArray(jsonObject.productOrderRes)) {
                    jsonObject.productOrderRes.forEach((item: any) => {
                        totalPrice += item.quantity * item.product.price;
                        totalQuantity += item.quantity;
                    });
                }
    
                setTotal(totalPrice);
                setTotalQuantity(totalQuantity);
                setOrder(jsonObject);
            } catch (error) {
                console.error('Error decoding or parsing JSON:', error);
            }
        }
    }, [searchParams, setOrder]);

    const formatDate = (dateTimeString: any) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.getMonth() + 1; 
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const seconds = dateTime.getSeconds();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

  return (
    <Paper sx={{width: "100%", padding: 3}} className='bg-slate-100'>
        <Grid container sx={{padding: "20px"}}>
            <Grid item xs={6}>
                <Typography gutterBottom variant='h4' component={'div'}  className='font-bold'>
                    Thông Tin Đơn Hàng
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom variant='h5' component={'div'} color={"gray"}  className='font-bold'  textAlign={"end"}>
                    Mã Đơn Hàng: #{order?.id}
                </Typography>
                <Typography gutterBottom variant='body2' component={'div'} fontStyle={"italic"} textAlign={"end"} >
                    Ngày đặt {formatDate(order?.address?.createdAt)}
                </Typography>
            </Grid>
        </Grid>
        <Divider />
        <Box height={15}/>
        <Stack direction={"row"} >
            <Stack width={"60%"}  >
                <Box sx={{padding: 2, maxHeight: 200, backgroundColor: "white",paddingRight: 5, paddingLeft: 5}} border={0.25} margin={1}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography gutterBottom variant='h5' component={'div'} sx={{padding: "10px", textTransform: "uppercase", fontWeight:"600"}} textAlign={"center"}>
                                Thông Tin Người Nhận
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant='h6' component={'div'} sx={{textTransform: "uppercase",marginLeft: -1}} >
                                {decodeURIComponent(escape(order?.address?.receiverName))}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom variant='body1' component={'div'} fontStyle={"italic"} sx={{textTransform: "capitalize"}}>
                                {decodeURIComponent(escape(order?.address?.address))}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant='body1' component={'div'} textAlign={"end"}>
                                {decodeURIComponent(escape(order?.address?.phone))}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{padding: "5px", textTransform: "uppercase", fontWeight:"600"}}>
                                Chi Tiết Đơn Hàng
                            </Typography>
                        </Grid>                        
                        <Grid item xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={12}>
                            <List
                                sx={{
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 500,
                                    '& ul': { padding: 0 },
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        borderRadius: '4px', 
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: 'transparent', 
                                    },

                                }}
                                subheader={<li />}
                            >
                            {
                                order && (
                                    order.productOrderRes && Array.isArray(order.productOrderRes) && order.productOrderRes.length > 0 ? (
                                order.productOrderRes.map(
                                    (item: any) =>(
                                        item && (
                                            <Paper key={item.id} elevation={3}>
                                                <Box padding={2} marginBottom={2}>
                                                    <Grid container> 
                                                    <Grid item xs={12}>
                                                        <Typography paddingLeft={1} gutterBottom  variant='h6' sx={{textTransform: "capitalize",whiteSpace: "nowrap",overflow: "hidden",textOverflow:"ellipsis",fontStyle: "italic"}} >
                                                            {decodeURIComponent(escape(item?.product?.name))}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography gutterBottom variant='subtitle1' paddingLeft={1}>
                                                            Loại: {decodeURIComponent(escape(item?.product?.type.name))}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography gutterBottom variant='subtitle1' >
                                                            Dành Cho Pet: {item?.product?.type.petTypes == "CAT"? "Mèo" : "Chó"}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography gutterBottom variant='subtitle1' paddingLeft={1}>
                                                            Giá: {(item?.product?.price).toLocaleString('en-US', {
                                                                style: 'decimal',
                                                                minimumFractionDigits: 3,
                                                                maximumFractionDigits: 3,
                                                                })} VND
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography gutterBottom variant='subtitle1'  paddingRight={4} >
                                                            Số Lượng: {item?.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography gutterBottom variant='subtitle1' textAlign={"end"} paddingRight={4} >
                                                            Tổng Số Tiền: {(item?.quantity * item.product.price).toLocaleString('en-US', {
                                                                style: 'decimal',
                                                                minimumFractionDigits: 3,
                                                                maximumFractionDigits: 3,
                                                                })} VND
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                        
                                    )))
                                    ) : (
                                        <Typography variant="body1" color="textSecondary">
                                            Không có sản phẩm nào trong đơn hàng.
                                        </Typography>
                                    )
                                )
                            }
                            </List>
                        </Grid>
                    </Grid>
                </Box>
                
            </Stack>
            <Paper sx={{width: "40%", padding: 1, backgroundColor: "white", maxHeight: 350}}  elevation={2}>
                <Box sx={{padding: 2, maxHeight: 200}} margin={1}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant='h5' component={'div'} sx={{padding: "10px", textTransform: "uppercase", fontWeight:"600"}} textAlign={"center"}>
                                Tổng Hóa Đơn Hàng
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant='h6'  component={'div'} >
                                Tổng Số Lượng: {totalQuantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant='h6' component={'div'} fontWeight={"600"} sx={{textTransform: "capitalize"}}>
                                Tổng Thành Tiền: {(total).toLocaleString('en-US', {
                                                                style: 'decimal',
                                                                minimumFractionDigits: 3,
                                                                maximumFractionDigits: 3,
                                                                })} VND
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Stack>
    </Paper>
  )
}
