import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'

export default function ItemProductOrder(item: any) {
  return (
    <ListItem alignItems="center" style={{marginBottom: 2, borderWidth: 0.5,}}>
        <ListItemAvatar>
            <Avatar
            sx={{ width: 100, height: 100 }}
            variant='rounded' 
            alt="Remy Sharp" 
            src={item.item.productRes.img}
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
                <Typography variant="body1">Đơn giá</Typography>
                  {
                    !!item.item.productRes.promotion?
                    (
                        <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}} marginRight={1} >
                          {(item.item.productRes?.promotion.discountType === "PERCENTAGE"?
                          (item.item.productRes?.price - item.item.productRes?.price * item.item?.productRes?.promotion.value):
                          (item.item.productRes?.price - item.item.productRes?.promotion.value) )
                          .toLocaleString('en-US', {
                          style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                          })}
                        </Typography>
                    ):(
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}}  >
                      {item.item?.productRes?.price.toLocaleString('en-US', {
                          style: 'decimal',
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                          })}
                    </Typography>
                    )}
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="body1">Số lượng</Typography>
                <Typography variant="body1">{item.item.quantity}</Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography variant="body1">Thành Tiền</Typography>
                {
                    !!item.item?.productRes?.promotion?
                    (
                        <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}} marginRight={1} >
                            {(item.item?.productRes?.promotion.discountType === "PERCENTAGE"?
                            (item.item?.productRes?.price - item.item?.productRes?.price * item.item?.productRes?.promotion.value) *  item.item.quantity:
                            (item.item?.productRes?.price - item.item?.productRes?.promotion.value) * item.item.quantity).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })}
                        </Typography>

                    ):(
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}}  >
                        {(item.item?.productRes?.price * item.item.quantity).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })}
                    </Typography>
                    )}
            </Stack>
            </Box>
        </ListItemText>
    </ListItem>
  )
}

