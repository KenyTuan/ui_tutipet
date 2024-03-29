"use client"
import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Checkbox, Collapse, Divider, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ListCartProps {
    item: any;
    checkedAll: boolean;
    handleClickDelete: (id: number) => void;
    handleCheckboxChange: () => void;
    handleQuantityChange: (id: number, quantity: number) => void;
  }
  

  const ListCart: React.FC<ListCartProps> = ({ item, checkedAll, handleClickDelete, handleCheckboxChange, handleQuantityChange }) => {
    const [quantity, setQuantity] = React.useState(item.quantity || 1);
    const [checked, setChecked] = React.useState(checkedAll);
    const router = useRouter();
    const handleChange = (value: number) => {
        if (0 < value && value < 100) {
            setQuantity(value);
            handleQuantityChange(item.id, value);
        }
    };

    React.useEffect(() => {
        setChecked(checkedAll);
      }, [checkedAll]);

    const handleChecked = () => {
        setChecked((prevChecked: any) => !prevChecked);
        handleCheckboxChange();
      };

    const handleCardClick = (id: any) => {
        router.push(`/products/${item.productRes.id}`);
    };

    return (
    <Box marginBottom={5}>
        <Paper elevation={2} >
            <Stack display={"flex"} flexDirection={'row'} justifyContent={"center"} alignItems={"center"} paddingTop={2} paddingBottom={2}>
                <Box width={"5%"} justifyContent={"center"} display={"flex"} >
                    <Checkbox checked={checked}  onClick={handleChecked} />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"40%"} paddingLeft={2} paddingRight={2}>
                    <Card>
                        <CardActionArea style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}
                            onClick={()=> handleCardClick(item.productRes.id)}
                        >
                            <CardMedia
                                component="img"
                                height={7}
                                style={{ height: '7rem',width: '7rem',objectFit: "cover" }}
                                image={item.productRes.img}
                                alt={item.productRes.name}
                            />
                            <CardContent sx={{width: "100%"}}>
                                <Typography gutterBottom variant="body1" component="div" style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2, 
                                }}
                                >
                                    {item?.productRes?.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"15%"} justifyContent={"center"} display={"flex"}>
                {
                    !!item?.productRes?.promotion?
                    (
                        <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}} marginRight={1} >
                            {(item?.productRes?.promotion.discountType === "PERCENTAGE"?
                            (item?.productRes?.price - item?.productRes?.price * item?.productRes?.promotion.value):
                            (item?.productRes?.price - item?.productRes?.promotion.value) ).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })} VND
                        </Typography>

                    ):(
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}}  >
                        {(item?.productRes?.price ).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })} VND
                    </Typography>
                    )}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"15%"} paddingLeft={3} paddingRight={3} justifyContent={"center"} display={"flex"}>
                <TextField
                    id="standard-number"
                    type="number"
                    defaultValue={1}
                    value={quantity}
                    onChange={(e: any) => handleChange(e.target.value)} 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    sx={{ textAlign: 'center' }}
                    />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"15%"} justifyContent={"center"} display={"flex"}>
                    {
                    !!item?.productRes?.promotion?
                    (
                        <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}} marginRight={1} >
                            {(item?.productRes?.promotion.discountType === "PERCENTAGE"?
                            (item?.productRes?.price - item?.productRes?.price * item?.productRes?.promotion.value) *  quantity:
                            (item?.productRes?.price - item?.productRes?.promotion.value) * quantity).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })} VND
                        </Typography>

                    ):(
                    <Typography variant="body1" color="text.secondary" sx={{fontWeight: 700,}}  >
                        {(item?.productRes?.price * quantity).toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3,
                            })}
                    </Typography>
                    )}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box width={"10%"} paddingLeft={2} justifyContent={"center"} display={"flex"}>
                    <Button size="medium" variant='contained' style={{ backgroundColor: "#FC9C55" }} onClick={() => handleClickDelete(item.id)}>
                        <Typography variant='body2' sx={{fontSize: 12}}>
                            Xóa
                        </Typography>
                    </Button>
                </Box>
            </Stack>
        </Paper>
    </Box>


  )
}

export default ListCart;