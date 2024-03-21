import { Box, Grid, Stack, Typography } from '@mui/material'
import { rowsStateInitializer } from '@mui/x-data-grid/internals'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaTiktok   } from "react-icons/fa";
import React from 'react'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Image from "next/image";

export default function Footer() {
  return (
    <Box sx={{height: 250, backgroundColor: "#9a6543"}}>
       
      <Grid container spacing={2} >
         
          <Grid xs={8} padding={2}>
            <Stack direction= 'row' >
              <FaFacebookSquare className='icon_ft size-11 fill-white'/>
              <FaInstagram  className='icon_ft size-11 fill-white'/>
              <FaTiktok  className='icon_ft size-11 fill-white'/>           
            </Stack>
            <Image src='/ve1.jpg' width={200} height={150} alt={'meow'} />
          </Grid>
        
          <Grid xs= {4}>
          <div className='p-8 text-white'>
            <h2 className='p-2'>LIÊN HỆ</h2>
            <p>Email: tutipet@gmail.com</p>
            <p>Phone: 0981988765</p>
            <p>Address: 18A, Cộng Hòa, Tân Bình, TP. Hồ Chí Minh</p>
          </div>
          </Grid>
          

      </Grid>
        
        

        <div className="bottom-bar">
          <p className='text-yellow-50 shadow-orange-600 text-center'>Tuti Pet © 2024 </p>
        </div>
      

    </Box>
  )
}
