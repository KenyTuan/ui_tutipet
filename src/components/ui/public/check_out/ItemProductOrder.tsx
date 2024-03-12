import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'

export default function ItemProductOrder(item: any) {
    console.log("item order", item)
  return (
    <ListItem alignItems="center" style={{marginBottom: 2, borderWidth: 0.5,}}>
        <ListItemAvatar>
            <Avatar
            sx={{ width: 100, height: 100 }}
            variant='rounded' 
            alt="Remy Sharp" 
            src="https://img.pikbest.com/wp/202345/cat-dog-pet-and-pets-in-real-pictures-wallpapers_9596134.jpg!w700wp"
            />
        </ListItemAvatar>
        <ListItemText >
            <Box padding={1}>
            <Typography gutterBottom variant="body1" component="div"  style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 1, 
                fontStyle: "italic"
            }}>
                {decodeURIComponent(escape(item.item.productRes.name))}
            </Typography>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography fontSize={13}>Đơn giá</Typography>
                <Typography fontSize={13}>{item.item.productRes.price} VND</Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography fontSize={13}>Số lượng</Typography>
                <Typography fontSize={13}>{item.item.quantity}</Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography fontSize={13}>Thành Tiền</Typography>
                <Typography fontSize={13}>{item.item.quantity * item.item.productRes.price}</Typography>
            </Stack>
            </Box>
        </ListItemText>
    </ListItem>
  )
}

