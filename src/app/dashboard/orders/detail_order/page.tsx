import DetailOrder from '@/components/ui/admin/orders/detail_order/DetailOrder'
import React from 'react'

export default function page({ params }: { params: { order: string }}) {
  return (
    <DetailOrder item={params.order}/>
  )
}
