import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'



export default function CardItemAddress({ item, handleSeleted}: { item: any,handleSeleted: (item:any) => void}) {
    console.log("item ",item)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    

  return (
    <Box sx={{borderWidth: 1, padding: 2, marginBottom: 2}}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={8}>
                        <Stack display={"flex"} flexDirection={"row"}>
                            <Typography variant='body1' fontSize={16} fontStyle={'italic'} fontWeight={600} >{item.receiverName}</Typography>
                            <Typography variant='body1' fontStyle={'italic'} paddingLeft={2}>{item.phone}</Typography>
                        </Stack>
                        <Typography variant='body2' width={"70%"} textTransform={'capitalize'}>
                            {item.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
                            <Button variant='text' onClick={handleClickOpen}>
                                Cập Nhật
                            </Button>
                            <Button variant='text' onClick={()=>(
                                    handleSeleted(item)
                                )}>
                                Chọn
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  )
}