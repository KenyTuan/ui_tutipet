import ListProducts from '@/components/ui/public/products/list_products/ListProducts'
import { Box } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <Box sx={{padding: 5, display: "flex", justifyContent:"center", alignItems:"center"}}>
        <ListProducts />
        <Box height={10}/>
    </Box>
  )
}
