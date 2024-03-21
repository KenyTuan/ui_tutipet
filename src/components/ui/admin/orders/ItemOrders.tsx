import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@mui/icons-material';
import { Box, Stack, Tab, TableCell, TableRow } from '@mui/material';
import React from 'react'
import IconButton from '@mui/material/IconButton';
import { Board, Column } from '../dashboard/Board';

interface ListCartProps {
  row: any;
  handleEditProduct: (row: any) => void;
  deleteProductByID: (id: number) => void;
  handleShowOrder: (row: any) => void;
}



const ItemOrders: React.FC<ListCartProps> = ({ row, handleEditProduct, deleteProductByID,handleShowOrder}) =>{
  const [open,setOpen] = React.useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        <TableCell key={"id"} align={"center"} className='border-r-2'>
            {row.id}
        </TableCell>
        <TableCell key={"name"} align={"center"} className='border-r-2'>
            {row.address.receiverName}
        </TableCell>
        <TableCell key={"type"} align={"center"} className='border-r-2'>
            {row.address.address}
        </TableCell>
        <TableCell key={"pet"} align={"center"} className='border-r-2'>
            {row.address.phone}
        </TableCell>
        <TableCell key={"price"} align={"center"} className='border-r-2'>
          {row.productOrderRes.reduce((total: number, item: any) => total + item.quantity, 0)}
        </TableCell>
        <TableCell key={"total"} align={"center"} className='border-r-2'>
            {(row.productOrderRes.reduce((total: number, item: any) => total + (item.quantity * item.product.price), 0) *1000).toLocaleString('en-US', {
              style: 'decimal',
                minimumFractionDigits: 3,
                maximumFractionDigits: 3,
              })} VND
        </TableCell>
        <TableCell key={"status"} align={"center"} className='border-r-2'>
            {row.status}
        </TableCell>
        <TableCell key={"action"} align="left" className='border-r-2'>
            <Stack spacing={2} direction="row" justifyContent={"center"} alignItems={"center"}>
                <Visibility
                    style={{
                    fontSize: "20px",
                    color: "gray",
                    cursor: "pointer",
                    }}
                    className="cursor-pointer"
                    onClick={()=>handleShowOrder(row)}
                />
                <Edit
                    style={{
                    fontSize: "20px",
                    color: "blue",
                    cursor: "pointer",
                    }}
                    className="cursor-pointer"
                    onClick={()=>handleEditProduct(row)}
                />
                <Delete
                    style={{
                    fontSize: "20px",
                    color: "darkred",
                    cursor: "pointer",
                    }}
                    onClick={() => {
                      deleteProductByID(row.id);
                    }}
                />
            </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ItemOrders;