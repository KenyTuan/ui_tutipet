import EditOrder from '@/components/ui/admin/orders/edit_order/EditOrder'
import { Box } from '@mui/material'
import React from 'react'

export default function page({ params }: { params: { order: string }}) {

  return (
    <Box>
        <EditOrder item={params.order} />
    </Box>
  )
}
