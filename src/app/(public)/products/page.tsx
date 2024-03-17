import React from 'react'
import ListProduct from '@/components/ui/public/products/ListProduct';
import {  Box, } from '@mui/material';
import Navbar from '@/components/ui/public/products/Navbar';


export default function page() {

  return (
    <Box sx={{display: "flex", flexDirection: 'row', padding: 1.5}}>
      <Navbar/>
      <ListProduct />
    </Box>

  )
}
