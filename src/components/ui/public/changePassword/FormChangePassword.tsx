"use client"
import { Box, Button, Divider, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export default function FormChangePassword() {
    const [oldPws, setOldPws] = React.useState('');
    const [newPws,setNewPws] = React.useState('');
    const [confirmPws,setConfirmPws] = React.useState('');




  return (
    <Paper elevation={3}>
        <Box sx={{padding: 3, }}>
            <Typography variant='h5' fontWeight={700} align='center'>Đổi Mật Khẩu</Typography>
            <Box height={10}/>
            <Divider />
            <Box  sx={{padding: 3, }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Password Cũ</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={oldPws}
                            onChange={(value: any)=> setOldPws(value)}
                            />
                        </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Password Mới</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={newPws}
                            onChange={(value: any)=> setNewPws(value)}
                            />
                        </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h6' align='right'>Xác Nhận Password</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{paddingLeft: 5, paddingRight: 5}}>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={confirmPws}
                            onChange={(value: any)=> setConfirmPws(value)}
                            />
                    </Grid>
                    <Grid item xs={12}  >
                        <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-around"} height={50} paddingLeft={15} paddingRight={15}>
                            <Button size="medium" variant='outlined' sx={{
                                    width: "20%",
                                    borderColor: "#FC9C55",
                                    '&:hover': {
                                    backgroundColor: "#FC9C55",
                                    borderColor: "#FC9C55",
                                    }
                                }}
                                
                            >
                                <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700, color: "#FC9C55",
                                    '&:hover': {
                                    color: "white"
                                    }}}
                                
                                    >
                                    Huỷ Bỏ
                                </Typography>
                            </Button>
                            <Button size="medium" variant='contained' style={{width: "20%", backgroundColor: "#FC9C55" }} >
                                <Typography variant='body2' sx={{fontSize: 14,fontWeight: 700,}}>
                                    Cập Nhật
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Paper>
  )
}
