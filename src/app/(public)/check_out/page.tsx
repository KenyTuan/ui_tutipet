import ConfirmOrder from '@/components/ui/public/check_out/ConfirmOrder'
import React from 'react'

export default function page({ params }: { params: { checkedItems: string } }) {
  return (
    <>
      <ConfirmOrder id={params.checkedItems} />
    </>
  )
}
