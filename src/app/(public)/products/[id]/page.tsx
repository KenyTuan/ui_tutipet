import ProductDetail from '@/components/ui/public/products/prodcuctId/ProductDetail'
import { Box } from '@mui/material'
import React from 'react'

export default function page({ params }: { params: { id: number } }) {

  return (
    <>
    <Box sx={{paddingLeft: 20, paddingRight: 20}}>
        <ProductDetail id={params.id} />
    </Box>
    </>
  )
}
