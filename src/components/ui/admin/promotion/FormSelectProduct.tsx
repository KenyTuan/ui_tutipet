import { BorderClear, Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React from 'react'
import TransferList from './TranferList';

export default function FormSelectProduct(eventClose: any, setData: any) {

  return (
    <>
        <Box component="div" sx={{ mt: 1 }} height={screen.height - (screen.height * 25 / 100)}>
            <Box >
                <Typography variant='h5' align='center' fontWeight={"600"}>
                    Chọn Sản Phẩm Cho Chương Trình Ưu Đãi
                </Typography>

                <IconButton 
                    style={{ position: "absolute", top: "0", right: "0"}}
                    onClick={eventClose}
                >
                    <Close />    
                </IconButton>           
            </Box>
            <Box height={8}/>
            <TransferList setData={setData}/>
        </Box>
    </>
  )
}
